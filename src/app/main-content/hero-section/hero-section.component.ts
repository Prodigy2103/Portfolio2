import { 
  ChangeDetectionStrategy, 
  Component, 
  NgZone, 
  ChangeDetectorRef, 
  OnInit, 
  OnDestroy 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HelloButtonComponent } from "../../shared/hello-button/hello-button.component";

interface SocialLink {
  url: string;
  icon: string;
  alt: string;
  external: boolean;
}

@Component({
  selector: 'app-hero-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, HelloButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  // Explizite Initialisierung der Buchstaben-Arrays
  public frontLetters: string[] = 'Frontend'.split('');
  public devLetters: string[] = 'DEVELOPER'.split('');

  // Social Media Links
  public socialLinks: SocialLink[] = [
    {
      url: 'https://www.linkedin.com/in/robert-marcus-g%C3%BChne-a53a63385/',
      icon: 'assets/Extras/Indeed.png',
      alt: 'LinkedIn Profil',
      external: true
    },
    {
      url: 'https://github.com/Prodigy2103',
      icon: 'assets/Extras/Github.png',
      alt: 'Github Profil',
      external: true
    },
    {
      url: 'mailto:marcusghne@gmx.de',
      icon: 'assets/Extras/Contact.png',
      alt: 'E-Mail Versand',
      external: false
    }
  ];

  // Tilt-Animation State
  private readonly MAX_ROTATE = 15;
  private animationId?: number;

  // Zielwerte für die Animation (Mausposition/Rotation)
  public target = { rx: 0, ry: 0, mx: 50, my: 50 };
  
  // Aktuelle interpolierte Werte für das Template
  public current = { rx: 0, ry: 0, mx: 50, my: 50 };

  constructor(
    private ngZone: NgZone, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Animation außerhalb von Angular starten für bessere Performance
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  private animate(): void {
    this.current.rx = this.lerp(this.current.rx, this.target.rx, 0.08);
    this.current.ry = this.lerp(this.current.ry, this.target.ry, 0.08);
    this.current.mx = this.lerp(this.current.mx, this.target.mx, 0.12);
    this.current.my = this.lerp(this.current.my, this.target.my, 0.12);

    // WICHTIG: Manuelle Change Detection anstoßen, da wir runOutsideAngular nutzen
    this.cdr.detectChanges();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  onMouseMove(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.target.mx = (x / rect.width) * 100;
    this.target.my = (y / rect.height) * 100;

    this.target.ry = ((x / rect.width) - 0.5) * (this.MAX_ROTATE * 2);
    this.target.rx = ((y / rect.height) - 0.5) * -(this.MAX_ROTATE * 2);
  }

  onMouseLeave(): void {
    this.target.rx = 0;
    this.target.ry = 0;
    this.target.mx = 50;
    this.target.my = 50;
  }
}