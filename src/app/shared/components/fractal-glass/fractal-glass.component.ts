import {
  Component,
  ElementRef,
  input,
  viewChild,
  signal,
  computed,
  effect,
  afterNextRender,
  DestroyRef,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  fractalGlassDefaults,
  fractalGlassCoverage,
  normalizeFractalGlass,
  type FractalGlassSettings,
  type FractalGlassMode,
  type FractalGlassCoverageMode,
  type FractalGlassSide,
  type FractalGlassDirection,
  type FractalGlassHoverPreset,
  type FractalGlassRecoveryDirection,
  type FractalGlassHoverAnimation,
  type FractalGlassEase,
} from './fractal-glass-model';
import { createFractalGlassRenderer } from './fractal-glass-renderer';

type RendererHandle = ReturnType<typeof createFractalGlassRenderer>;

@Component({
  selector: 'app-fractal-glass',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #host
      class="fractal-glass"
      [style.height]="resolvedHeight()"
      [style.border-radius]="resolvedBorderRadius()"
      [attr.data-renderer]="ready() ? 'webgl' : 'native'"
      [attr.data-animate-entrance]="animateEntrance()"
      [attr.data-image-ready]="loadedSource() === src()"
      [attr.data-glass-mode]="disabled() ? 'disabled' : hoverEffect() ? 'hover' : 'always'"
      [attr.data-hover-preset]="hoverPreset()"
      [attr.data-hover-animation]="hoverAnimation()"
      (pointerenter)="onPointerEnter($event)"
      (pointermove)="onPointerMove($event)"
      (pointerleave)="onPointerLeave($event)"
      (pointerdown)="onPointerDown($event)"
      (pointerup)="onPointerUp($event)"
      (pointercancel)="onPointerCancel()"
    >
      <img
        class="fractal-glass-image"
        [src]="src()"
        [alt]="alt()"
        decoding="async"
        (load)="onImageLoad($event)"
      />
      <canvas #canvas class="fractal-glass-canvas" aria-hidden="true"></canvas>
      <div class="fractal-glass-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './fractal-glass.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FractalGlassComponent {
  private readonly destroyRef = inject(DestroyRef);
  private engine: RendererHandle | null = null;
  private touchStart: { x: number; y: number } | null = null;

  readonly hostRef = viewChild<ElementRef<HTMLDivElement>>('host');
  readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  readonly src = input.required<string>();
  readonly alt = input<string>('Fractal Glass');
  readonly height = input<number | string>(280);
  readonly borderRadius = input<number | string>(0);
  readonly animateEntrance = input<boolean>(fractalGlassDefaults.animateEntrance);
  readonly mode = input<FractalGlassMode>(fractalGlassDefaults.mode);
  readonly stripes = input<number>(fractalGlassDefaults.stripes);
  readonly distortion = input<number>(fractalGlassDefaults.distortion);
  readonly refractionBias = input<number>(fractalGlassDefaults.refractionBias);
  readonly blur = input<number>(fractalGlassDefaults.blur);
  readonly grain = input<number>(fractalGlassDefaults.grain);
  readonly smoothness = input<number>(fractalGlassDefaults.smoothness);
  readonly textureScale = input<number>(fractalGlassDefaults.textureScale);
  readonly blackPoint = input<number>(fractalGlassDefaults.blackPoint);
  readonly whitePoint = input<number>(fractalGlassDefaults.whitePoint);
  readonly gamma = input<number>(fractalGlassDefaults.gamma);
  readonly edgeWidth = input<number>(fractalGlassDefaults.edgeWidth);
  readonly coverage = input<number>(fractalGlassDefaults.coverage);
  readonly coverageMode = input<FractalGlassCoverageMode>(fractalGlassDefaults.coverageMode);
  readonly side = input<FractalGlassSide>(fractalGlassDefaults.side);
  readonly direction = input<FractalGlassDirection>(fractalGlassDefaults.direction);
  readonly hoverEffect = input<boolean>(fractalGlassDefaults.hoverEffect);
  readonly hoverPreset = input<FractalGlassHoverPreset>(fractalGlassDefaults.hoverPreset);
  readonly recoveryDirection = input<FractalGlassRecoveryDirection>(
    fractalGlassDefaults.recoveryDirection,
  );
  readonly hoverAnimation = input<FractalGlassHoverAnimation>(fractalGlassDefaults.hoverAnimation);
  readonly hoverDuration = input<number>(fractalGlassDefaults.hoverDuration);
  readonly hoverRadius = input<number>(fractalGlassDefaults.hoverRadius);
  readonly hoverFeather = input<number>(fractalGlassDefaults.hoverFeather);
  readonly transitionBlend = input<number>(fractalGlassDefaults.transitionBlend);
  readonly duration = input<number>(fractalGlassDefaults.duration);
  readonly ease = input<FractalGlassEase>(fractalGlassDefaults.ease);
  readonly disabled = input<boolean>(false);

  readonly ready = signal<boolean>(false);
  readonly loadedSource = signal<string | null>(null);
  readonly hovered = signal<boolean>(false);
  readonly touched = signal<boolean>(false);

  readonly isActive = computed(() => this.hovered() || this.touched());

  readonly resolvedHeight = computed(() => {
    const value = this.height();
    return typeof value === 'number' ? `${value}px` : value;
  });

  readonly resolvedBorderRadius = computed(() => {
    const value = this.borderRadius();
    return typeof value === 'number' ? `${value}px` : value;
  });

  readonly currentSettings = computed(() =>
    normalizeFractalGlass({
      animateEntrance: this.animateEntrance(),
      mode: this.mode(),
      stripes: this.stripes(),
      distortion: this.distortion(),
      refractionBias: this.refractionBias(),
      blur: this.blur(),
      grain: this.grain(),
      smoothness: this.smoothness(),
      textureScale: this.textureScale(),
      blackPoint: this.blackPoint(),
      whitePoint: this.whitePoint(),
      gamma: this.gamma(),
      edgeWidth: this.edgeWidth(),
      coverage: this.coverage(),
      coverageMode: this.coverageMode(),
      side: this.side(),
      direction: this.direction(),
      hoverEffect: this.hoverEffect(),
      hoverPreset: this.hoverPreset(),
      recoveryDirection: this.recoveryDirection(),
      hoverAnimation: this.hoverAnimation(),
      hoverDuration: this.hoverDuration(),
      hoverRadius: this.hoverRadius(),
      hoverFeather: this.hoverFeather(),
      transitionBlend: this.transitionBlend(),
      duration: this.duration(),
      ease: this.ease(),
      disabled: this.disabled(),
    }),
  );

  constructor() {
    afterNextRender(() => this.initRenderer());
    effect(() => this.syncSettings());
    effect(() => this.syncSource());
  }

  private initRenderer(): void {
    const canvas = this.canvasRef()?.nativeElement;
    const host = this.hostRef()?.nativeElement;
    if (!canvas || !host) return;
    this.engine = createFractalGlassRenderer(
      canvas,
      host,
      this.currentSettings(),
      this.isActive(),
      (readyStatus: boolean) => this.ready.set(readyStatus),
    );
    this.engine?.setSource(this.src());
    this.registerDestroy();
  }

  private syncSettings(): void {
    const settings = this.currentSettings();
    const activeState = this.isActive();
    this.engine?.update(settings, activeState);
  }

  private syncSource(): void {
    const currentSrc = this.src();
    this.engine?.setSource(currentSrc);
  }

  private registerDestroy(): void {
    this.destroyRef.onDestroy(() => {
      this.engine?.destroy();
      this.engine = null;
    });
  }

  onImageLoad(event: Event): void {
    const image = event.currentTarget as HTMLImageElement;
    image
      ?.decode()
      ?.catch(() => {})
      ?.then(() => {
        if (image.isConnected && image.getAttribute('src') === this.src()) {
          this.loadedSource.set(this.src());
        }
      });
  }

  onPointerEnter(event: PointerEvent): void {
    if (event.pointerType !== 'touch') {
      this.trackPointer(event.clientX, event.clientY);
    }
  }

  onPointerMove(event: PointerEvent): void {
    if (event.pointerType !== 'touch') {
      this.trackPointer(event.clientX, event.clientY);
    }
  }

  onPointerLeave(_event: PointerEvent): void {
    this.hovered.set(false);
    this.touchStart = null;
  }

  onPointerDown(event: PointerEvent): void {
    if (event.pointerType === 'touch' && this.isInsideGlass(event.clientX, event.clientY)) {
      this.touchStart = { x: event.clientX, y: event.clientY };
      this.moveCircle(event.clientX, event.clientY);
    }
  }

  onPointerUp(event: PointerEvent): void {
    const start = this.touchStart;
    this.touchStart = null;
    if (event.pointerType !== 'touch' || !start) return;
    if (
      this.hoverEffect() &&
      !this.disabled() &&
      this.isInsideGlass(event.clientX, event.clientY) &&
      Math.hypot(event.clientX - start.x, event.clientY - start.y) < 8
    ) {
      this.touched.update((value) => !value);
    }
  }

  onPointerCancel(): void {
    this.touchStart = null;
    this.hovered.set(false);
  }

  private trackPointer(x: number, y: number): void {
    const bounds = this.hostRef()?.nativeElement?.getBoundingClientRect();
    this.moveCircle(x, y, bounds);
    this.hovered.set(this.isInsideGlass(x, y, bounds));
  }

  private moveCircle(x: number, y: number, bounds?: DOMRect): void {
    const rect = bounds ?? this.hostRef()?.nativeElement?.getBoundingClientRect();
    if (!rect || rect.width <= 0 || rect.height <= 0) return;
    this.engine?.setPointer((x - rect.left) / rect.width, 1 - (y - rect.top) / rect.height);
  }

  private isInsideGlass(x: number, y: number, bounds?: DOMRect): boolean {
    const rect = bounds ?? this.hostRef()?.nativeElement?.getBoundingClientRect();
    if (!rect || rect.width <= 0 || rect.height <= 0 || this.disabled()) return false;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return false;
    const settings = this.currentSettings();
    if (settings.hoverEffect && settings.hoverAnimation === 'circle') return true;
    return this.checkStripeCoverage(x, y, rect, settings);
  }

  private checkStripeCoverage(
    x: number,
    y: number,
    bounds: DOMRect,
    settings: FractalGlassSettings,
  ): boolean {
    const covered = fractalGlassCoverage(settings);
    if (covered <= 0) return false;
    const isHorizontal = settings.coverageMode === 'stripes' && settings.direction === 'horizontal';
    const position = isHorizontal
      ? settings.side === 'right'
        ? bounds.bottom - y
        : y - bounds.top
      : settings.side === 'right'
        ? bounds.right - x
        : x - bounds.left;
    const totalSpan = isHorizontal ? bounds.height : bounds.width;
    return position <= totalSpan * covered;
  }
}

