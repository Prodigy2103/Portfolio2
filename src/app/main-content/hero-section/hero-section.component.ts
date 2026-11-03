import { FractalGlassComponent } from '../../shared/components/fractal-glass/fractal-glass.component';
import { RefractedTextComponent } from '../../shared/components/refracted-text/refracted-text.component';
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
import { CommonModule, NgOptimizedImage, ViewportScroller } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';

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
  imports: [
    CommonModule,
    TranslateModule,
    NgOptimizedImage,
    MagneticDirective,
    RefractedTextComponent,
    FractalGlassComponent
  ],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly elRef = inject(ElementRef);
  private readonly scroller = inject(ViewportScroller);

  public readonly nameLetters = signal<string[]>('Marcus Gühne'.split(''));

  public readonly socialLinks = signal<SocialLink[]>([
    {
      url: 'https://github.com/Prodigy2103',
      icon: 'assets/Extras/Github.png',
      alt: 'Github',
      title: 'GitHub Profil ansehen',
      external: true,
      w: 22,
      h: 22
    },
    {
      url: 'https://www.linkedin.com/',
      icon: 'assets/Extras/icons8-linkedin-52.png',
      alt: 'LinkedIn',
      title: 'LinkedIn Profil ansehen',
      external: true,
      w: 22,
      h: 22
    },
    {
      url: 'mailto:marcusghne@gmx.de',
      icon: 'assets/Extras/Contact.png',
      alt: 'Mail',
      title: 'E-Mail schreiben',
      external: false,
      w: 22,
      h: 22
    }
  ]);

  public readonly mouseX = signal<number>(0);
  public readonly mouseY = signal<number>(0);
  public readonly isHovering = signal<boolean>(false);

  public readonly transformStyle = computed(() => {
    if (!this.isHovering()) return 'rotate(5deg)';
    const x = this.mouseX();
    const y = this.mouseY();
    return `rotate(5deg) perspective(1000px) rotateX(${y * -14}deg) rotateY(${x * 14}deg) scale3d(1.04, 1.04, 1.04)`;
  });

  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }

  public onMouseMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    this.mouseX.set(x);
    this.mouseY.set(y);
    this.isHovering.set(true);
  }

  public onMouseLeave(): void {
    this.isHovering.set(false);
  }

  public scrollToProjects(event: Event): void {
    event.preventDefault();
    this.scroller.scrollToAnchor('projects');
  }

  public scrollToContact(event: Event): void {
    event.preventDefault();
    this.scroller.scrollToAnchor('contact');
  }
}
