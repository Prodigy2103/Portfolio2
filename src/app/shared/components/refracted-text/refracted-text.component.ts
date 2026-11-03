import {
  Component,
  ElementRef,
  input,
  viewChild,
  afterNextRender,
  DestroyRef,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  createRefractedRenderer,
  type RefractedLiftEase,
  type RefractedRenderer,
} from './refracted-renderer';

@Component({
  selector: 'app-refracted-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="refracted-text"
      [style.font-size]="fontSize()"
      [style.font-family]="fontFamily()"
      [style.font-weight]="fontWeight()"
      [style.letter-spacing]="letterSpacing()"
      [style.aspect-ratio]="aspectRatio()"
      [style.--refracted-width]="refractedWidth()"
      role="img"
      [attr.aria-label]="text()"
    >
      <canvas #canvas aria-hidden="true"></canvas>
      @if (hasFailed()) {
        <span class="refracted-text__fallback" aria-hidden="true">
          {{ text() }}
        </span>
      }
    </span>
  `,
  styleUrl: './refracted-text.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefractedTextComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elRef = inject(ElementRef);
  private renderer: RefractedRenderer | null = null;
  private animFrameId: number | null = null;

  readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  readonly text = input.required<string>();
  readonly theme = input<'dark' | 'light' | 'auto'>('dark');
  readonly topColor = input<string>('#080e18');
  readonly bottomColor = input<string>('#718ab1');
  readonly beamColor = input<string>('#7baaff');
  readonly spectrumWarmColor = input<string>('#d09bef');
  readonly spectrumMiddleColor = input<string>('#2979ff');
  readonly spectrumCoolColor = input<string>('#00328f');
  readonly reveal = input<boolean>(true);
  readonly stagger = input<number>(0.55);
  readonly liftDuration = input<number>(1.75);
  readonly ease = input<RefractedLiftEase>('power4.out');
  readonly beamFollowsLift = input<boolean>(false);
  readonly animateBeam = input<boolean>(true);
  readonly openingDuration = input<number>(6.9);
  readonly duration = input<number>(13.2);
  readonly intensity = input<number>(1.2);
  readonly dispersion = input<number>(1.75);
  readonly colorIntensity = input<number>(1.1);
  readonly beamPosition = input<number>(0.5);
  readonly fixedBeam = input<boolean>(false);
  readonly paused = input<boolean>(false);
  readonly cursorMovesBeam = input<boolean>(false);
  readonly fontSize = input<string>('400px');
  readonly fontFamily = input<string>("'ReactDrops Square Display', 'Arial Black', sans-serif");
  readonly fontWeight = input<number | string>(900);
  readonly letterSpacing = input<string>('normal');
  readonly extraBold = input<number>(2.25);
  readonly fontHeight = input<number>(80);
  readonly cornerRounding = input<number>(1);

  readonly hasFailed = signal<boolean>(false);

  readonly aspectRatio = computed(() => {
    const letters = Array.from(this.text());
    const virtualWidth = Math.max(1, letters.length * 394);
    return `${virtualWidth} / 318`;
  });

  readonly refractedWidth = computed(() => {
    const letters = Array.from(this.text());
    return `${letters.length * 1.28}em`;
  });

  constructor() {
    afterNextRender(() => {
      this.initEngine();
    });
  }

  private initEngine(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;

    try {
      this.renderer = createRefractedRenderer(
        canvas,
        this.text(),
        this.fontFamily(),
        this.fontWeight(),
        this.letterSpacing(),
        this.extraBold(),
        this.cornerRounding()
      );
    } catch {
      this.renderer = null;
    }

    if (!this.renderer) {
      this.hasFailed.set(true);
      return;
    }

    this.startAnimationLoop(canvas);
    this.registerDestroy();
  }

  private startAnimationLoop(canvas: HTMLCanvasElement): void {
    const startTime = performance.now();
    const durationSec = this.duration();

    const loop = (time: number) => {
      if (!this.renderer) return;

      const elapsed = (time - startTime) / 1000;
      const revealSec = this.reveal() ? elapsed : durationSec;
      const progressTime = this.paused() ? durationSec * 0.35 : elapsed;

      this.renderer.resize();
      this.renderer.render(
        progressTime,
        durationSec,
        this.openingDuration(),
        this.intensity(),
        this.beamPosition(),
        this.fixedBeam(),
        0.5,
        0.5,
        0,
        this.cursorMovesBeam(),
        this.theme() === 'light' ? 1 : 0,
        revealSec,
        this.liftDuration(),
        this.stagger(),
        this.ease(),
        this.beamFollowsLift(),
        this.topColor(),
        this.bottomColor(),
        this.dispersion(),
        this.colorIntensity(),
        this.beamColor(),
        this.spectrumWarmColor(),
        this.spectrumMiddleColor(),
        this.spectrumCoolColor()
      );

      this.animFrameId = requestAnimationFrame(loop);
    };

    this.animFrameId = requestAnimationFrame(loop);
  }

  private registerDestroy(): void {
    this.destroyRef.onDestroy(() => {
      if (this.animFrameId !== null) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
      this.renderer?.dispose();
      this.renderer = null;
    });
  }
}
