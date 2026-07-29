import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  NgZone,
  OnDestroy,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appMagnetic]',
  standalone: true
})
export class MagneticDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly ngZone = inject(NgZone);

  public readonly magneticStrength = input<number>(0.3);

  private animationId?: number;
  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => this.animate());
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  @HostListener('mousemove', ['$event'])
  public onMouseMove(e: MouseEvent): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    this.targetX = (e.clientX - centerX) * this.magneticStrength();
    this.targetY = (e.clientY - centerY) * this.magneticStrength();
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this.targetX = 0;
    this.targetY = 0;
  }

  private animate(): void {
    this.currentX += (this.targetX - this.currentX) * 0.1;
    this.currentY += (this.targetY - this.currentY) * 0.1;

    this.el.nativeElement.style.transform = `translate3d(${this.currentX.toFixed(2)}px, ${this.currentY.toFixed(2)}px, 0)`;
    this.animationId = requestAnimationFrame(() => this.animate());
  }
}
