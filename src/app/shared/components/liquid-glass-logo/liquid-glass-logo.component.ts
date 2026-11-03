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
  createLiquidGlassLogoRenderer,
  liquidGlassLogoDefaults,
  liquidGlassLogoThemes,
  normalizeLiquidGlassLogo,
  type LiquidGlassLogoTuning,
} from './liquid-glass-logo-renderer';

export type LiquidGlassLogoRendererInstance = ReturnType<typeof createLiquidGlassLogoRenderer>;

@Component({
  selector: 'app-liquid-glass-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="liquid-glass-logo"
      [style.height]="resolvedHeight()"
      [style.background]="tuning().background"
      role="img"
      [attr.aria-label]="label()"
      [attr.data-liquid-glass-ready]="isReady() || undefined"
    >
      <canvas #canvas aria-hidden="true"></canvas>
      @if (hasFallback()) {
        <span class="liquid-glass-logo-fallback" aria-hidden="true">
          <img
            [src]="logo()"
            alt=""
            [style.width.px]="fallbackWidth()"
            [style.height.px]="fallbackHeight()"
            class="fallback-img"
          />
        </span>
      }
    </div>
  `,
  styleUrl: './liquid-glass-logo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiquidGlassLogoComponent {
  private readonly destroyRef = inject(DestroyRef);
  private engine: LiquidGlassLogoRendererInstance | null = null;

  readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  readonly logo = input<string>('assets/ProjectsImg/LOGO_NEW.png');
  readonly ending = input<'logo' | 'wordmark'>('logo');
  readonly theme = input<'light' | 'dark'>('light');
  readonly logoColor = input<string>('original');
  readonly logoSize = input<number>(256);
  readonly logoScale = input<number>(1);
  readonly relief = input<number>(2);
  readonly height = input<number | string>(75);
  readonly label = input<string>('Logo');

  readonly isReady = signal<boolean>(false);
  readonly hasFallback = signal<boolean>(false);

  readonly resolvedHeight = computed(() => {
    const val = this.height();
    return typeof val === 'number' ? `${val}px` : val;
  });

  readonly tuning = computed<LiquidGlassLogoTuning>(() => {
    const themeKey = this.theme() === 'dark' ? 'dark' : 'light';
    const themeConfig = liquidGlassLogoThemes[themeKey];
    return normalizeLiquidGlassLogo({
      ...liquidGlassLogoDefaults,
      ...themeConfig,
      logo: this.logo(),
      ending: this.ending(),
      logoColor: this.logoColor(),
      logoSize: this.logoSize(),
      logoScale: this.logoScale(),
      relief: this.relief(),
      background: 'transparent',
    });
  });

  readonly fallbackWidth = computed(() => {
    const t = this.tuning();
    return t.logoSize * t.logoScale * t.finalLogoScale;
  });

  readonly fallbackHeight = computed(() => {
    return this.fallbackWidth();
  });

  constructor() {
    afterNextRender(() => {
      this.initRenderer();
    });
  }

  private initRenderer(): void {
    const canvasEl = this.canvasRef()?.nativeElement;
    if (!canvasEl) return;

    if (this.isReducedMotion()) {
      this.hasFallback.set(true);
      return;
    }

    try {
      this.engine = createLiquidGlassLogoRenderer(
        canvasEl,
        this.tuning(),
        () => this.isReady.set(true)
      );
    } catch {
      this.engine = null;
    }

    if (!this.engine) {
      this.hasFallback.set(true);
      return;
    }

    this.destroyRef.onDestroy(() => {
      this.engine?.dispose();
      this.engine = null;
    });
  }

  private isReducedMotion(): boolean {
    return typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
