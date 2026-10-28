import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ScrollObserverService } from './scroll-observer.service';

describe('ScrollObserverService', () => {
  let service: ScrollObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScrollObserverService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(ScrollObserverService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should bypass animation and trigger callback immediately on server platform', () => {
    const serverService = TestBed.runInInjectionContext(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ScrollObserverService,
          { provide: PLATFORM_ID, useValue: 'server' }
        ]
      });
      return TestBed.inject(ScrollObserverService);
    });

    let isVisibleResult = false;
    const testElement = document.createElement('div');
    serverService.observe(testElement, (visible: boolean) => {
      isVisibleResult = visible;
    });

    expect(isVisibleResult).toBe(true);
  });

  it('should register target and unobserve cleanly', () => {
    const testElement = document.createElement('div');
    let called = false;

    service.observe(testElement, () => {
      called = true;
    });

    service.unobserve(testElement);
    expect(called).toBe(false);
  });
});
