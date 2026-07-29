import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  OnDestroy,
  AfterViewInit,
  signal,
  computed,
  inject
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HelloButtonComponent } from "../../shared/hello-button/hello-button.component";
import { MagneticDirective } from '../../shared/directives/magnetic.directive';
import { animate, stagger } from 'animejs';

export interface SocialLink {
  url: string;
  icon: string;
  alt: string;
  title: string;
  external: boolean;
  w: number;
  h: number;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, HelloButtonComponent, NgOptimizedImage, MagneticDirective],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly elRef = inject(ElementRef);

  public readonly frontLetters = signal<string[]>('Frontend'.split(''));
  public readonly devLetters = signal<string[]>('DEVELOPER'.split(''));

  public readonly socialLinks = signal<SocialLink[]>([
    { url: 'https://www.linkedin.com/', icon: 'assets/Extras/icons8-linkedin-52.png', alt: 'LinkedIn Profil', title: 'Besuchen Sie mein Profil auf LinkedIn', external: true, w: 32, h: 32 },
    { url: 'https://github.com/Prodigy2103', icon: 'assets/Extras/Github.png', alt: 'Github Profil', title: 'Meinen Code auf GitHub ansehen', external: true, w: 32, h: 32 },
    { url: 'mailto:marcusghne@gmx.de', icon: 'assets/Extras/Contact.png', alt: 'E-Mail Versand', title: 'Eine E-Mail an Marcus Gühne schreiben', external: false, w: 32, h: 32 }
  ]);

  private readonly MAX_ROTATE = 15;
  private animationId?: number;

  public target = signal({ rx: 0, ry: 0, mx: 50, my: 50 });
  public current = signal({ rx: 0, ry: 0, mx: 50, my: 50 });

  public transformStyle = computed(() => {
    const c = this.current();
    return `perspective(1000px) rotateX(${c.rx}deg) rotateY(${c.ry}deg)`;
  });

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => this.startAnimationLoop());
  }

  ngAfterViewInit(): void {
    this.initHeroEntranceAnimation();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private startAnimationLoop(): void {
    const c = this.current();
    const t = this.target();

    const rx = this.lerp(c.rx, t.rx, 0.08);
    const ry = this.lerp(c.ry, t.ry, 0.08);
    const mx = this.lerp(c.mx, t.mx, 0.12);
    const my = this.lerp(c.my, t.my, 0.12);

    this.current.set({ rx, ry, mx, my });
    this.animationId = requestAnimationFrame(() => this.startAnimationLoop());
  }

  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  private initHeroEntranceAnimation(): void {
    animate(this.elRef.nativeElement.querySelectorAll('.letter'), {
      translateY: [40, 0],
      opacity: [0, 1],
      delay: stagger(40, { start: 200 }),
      ease: 'outExpo',
      duration: 800
    });

    animate(this.elRef.nativeElement.querySelectorAll('.hero-svg-path'), {
      strokeDashoffset: [1000, 0],
      opacity: [0.2, 0.6],
      ease: 'easeInOutQuad',
      duration: 2500,
      loop: true,
      direction: 'alternate'
    });
  }

  public onMouseMove(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const mx = (x / rect.width) * 100;
    const my = (y / rect.height) * 100;
    const ry = ((x / rect.width) - 0.5) * (this.MAX_ROTATE * 2);
    const rx = ((y / rect.height) - 0.5) * -(this.MAX_ROTATE * 2);

    this.target.set({ rx, ry, mx, my });
  }

  public onMouseLeave(): void {
    this.target.set({ rx: 0, ry: 0, mx: 50, my: 50 });
  }

  public scrollToContact(e: Event): void {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}