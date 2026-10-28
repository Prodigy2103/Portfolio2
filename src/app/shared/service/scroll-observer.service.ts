import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollObserverService implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly targets = new Map<Element, (isVisible: boolean) => void>();

  private observer: IntersectionObserver | null = null;

  public observe(element: Element, callback: (isVisible: boolean) => void): void {
    if (!this.isBrowser) {
      callback(true);
      return;
    }
    if (this.shouldBypassAnimation()) {
      callback(true);
      return;
    }
    this.registerTarget(element, callback);
  }

  public unobserve(element: Element): void {
    this.targets.delete(element);
    this.observer?.unobserve(element);
  }

  public ngOnDestroy(): void {
    this.observer?.disconnect();
    this.targets.clear();
    this.observer = null;
  }

  private registerTarget(element: Element, callback: (isVisible: boolean) => void): void {
    this.ensureObserverInitialized();
    this.targets.set(element, callback);
    this.observer?.observe(element);
  }

  private ensureObserverInitialized(): void {
    if (this.observer) return;
    this.observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => this.handleEntries(entries),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
  }

  private handleEntries(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      this.processEntry(entry);
    }
  }

  private processEntry(entry: IntersectionObserverEntry): void {
    if (!entry.isIntersecting || entry.intersectionRatio < 0.12) return;
    const callback = this.targets.get(entry.target);
    if (!callback) return;
    callback(true);
    this.unobserve(entry.target);
  }

  private shouldBypassAnimation(): boolean {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return true;
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
