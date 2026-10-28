import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  output,
  signal
} from '@angular/core';
import { ScrollObserverService } from '../service/scroll-observer.service';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
  host: {
    '[attr.data-visible]': 'isVisible()'
  }
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly observerService = inject(ScrollObserverService);

  public readonly isVisible = signal<boolean>(false);
  public readonly visibleChange = output<boolean>();

  public ngOnInit(): void {
    this.observerService.observe(
      this.elementRef.nativeElement,
      (visible: boolean) => this.onVisibilityChange(visible)
    );
  }

  public ngOnDestroy(): void {
    this.observerService.unobserve(this.elementRef.nativeElement);
  }

  private onVisibilityChange(visible: boolean): void {
    this.isVisible.set(visible);
    this.visibleChange.emit(visible);
  }
}
