import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollRevealDirective } from './scroll-reveal.directive';
import { ScrollObserverService } from '../service/scroll-observer.service';

@Component({
  standalone: true,
  imports: [ScrollRevealDirective],
  template: `<div appScrollReveal>Reveal Target</div>`
})
class TestHostComponent {}

class MockScrollObserverService {
  private lastElement: Element | null = null;
  private lastCallback: ((isVisible: boolean) => void) | null = null;

  public observe(element: Element, callback: (isVisible: boolean) => void): void {
    this.lastElement = element;
    this.lastCallback = callback;
  }

  public unobserve(element: Element): void {
    if (this.lastElement === element) {
      this.lastElement = null;
      this.lastCallback = null;
    }
  }

  public triggerReveal(): void {
    this.lastCallback?.(true);
  }
}

describe('ScrollRevealDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let element: HTMLElement;
  let mockService: MockScrollObserverService;

  beforeEach(async () => {
    mockService = new MockScrollObserverService();

    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ScrollRevealDirective],
      providers: [
        { provide: ScrollObserverService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    element = fixture.nativeElement.querySelector('div') as HTMLElement;
  });

  it('should initialize with data-visible false attribute', () => {
    expect(element.getAttribute('data-visible')).toBe('false');
  });

  it('should update data-visible to true when service triggers visibility', () => {
    mockService.triggerReveal();
    fixture.detectChanges();

    expect(element.getAttribute('data-visible')).toBe('true');
  });

  it('should unobserve the element on component destroy', () => {
    const unobserveSpy = spyOn(mockService, 'unobserve').and.callThrough();
    fixture.destroy();

    expect(unobserveSpy).toHaveBeenCalledWith(element);
  });
});
