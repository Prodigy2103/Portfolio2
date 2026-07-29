import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  signal,
  inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { animate, stagger } from 'animejs';

export interface AboutInfo {
  svgPath: string;
  colorClass: string;
  translationKey: string;
}

@Component({
  selector: 'app-about-me',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements OnInit, OnDestroy {
  private readonly elRef = inject(ElementRef);
  private observer?: IntersectionObserver;

  public readonly isVisible = signal(false);

  public readonly aboutInfo = signal<AboutInfo[]>([
    {
      svgPath: 'M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6',
      colorClass: 'neon-card',
      translationKey: 'about.location'
    },
    {
      svgPath: 'M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z',
      colorClass: 'blue-card',
      translationKey: 'about.relocation'
    },
    {
      svgPath: 'M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2 2 0 0 1 14 4h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2 2 0 0 1-2 2v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14a2 2 0 0 1-2-2H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2a2 2 0 0 1 2-2V.5a.5.5 0 0 1 .5-.5z',
      colorClass: 'orange-card',
      translationKey: 'about.remote'
    }
  ]);

  ngOnInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupIntersectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.isVisible.set(true);
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.triggerEntrance();
        }
      });
    }, { threshold: 0.2 });

    this.observer.observe(this.elRef.nativeElement);
  }

  private triggerEntrance(): void {
    this.isVisible.set(true);
    this.animateCards();
    this.observer?.disconnect();
  }

  private animateCards(): void {
    animate(this.elRef.nativeElement.querySelectorAll('.info-card'), {
      translateX: [-30, 0],
      opacity: [0, 1],
      delay: stagger(120),
      ease: 'outQuart',
      duration: 600
    });
  }

  public scrollToContact(e: Event): void {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}