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
  // Texteffekte
  frontLetters = 'Frontend'.split('');
  devLetters = 'DEVELOPER'.split('');

  // Social Media Links
  socialLinks: SocialLink[] = [
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
  private MAX_ROTATE = 15;
  private animationId?: number;

  // Zielwerte für die Animation
  public target = { rx: 0, ry: 0, mx: 50, my: 50 };
  // Aktuelle interpolierte Werte für das Template
  public current = { rx: 0, ry: 0, mx: 50, my: 50 };

  constructor(
    private ngZone: NgZone, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Animation außerhalb von Angular starten, um unnötige Change Detection Cycles zu vermeiden
    this.ngZone.runOutsideAngular(() => {
      this.animate();
    });
  }

  ngOnDestroy(): void {
    // Animation stoppen, wenn die Komponente zerstört wird
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  /**
   * Linear Interpolation (LERP)
   * Berechnet den Wert zwischen 'a' und 'b' basierend auf dem Faktor 't' (Smoothing)
   */
  private lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  private animate(): void {
    // Sanfte Annäherung der aktuellen Werte an die Zielwerte
    this.current.rx = this.lerp(this.current.rx, this.target.rx, 0.08);
    this.current.ry = this.lerp(this.current.ry, this.target.ry, 0.08);
    
    // Shine-Effekt (etwas direkter)
    this.current.mx = this.lerp(this.current.mx, this.target.mx, 0.12);
    this.current.my = this.lerp(this.current.my, this.target.my, 0.12);

    // Da wir runOutsideAngular nutzen, müssen wir Angular manuell sagen, dass sich Werte geändert haben
    this.cdr.detectChanges();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  /**
   * Berechnet die Neigung basierend auf der Mausposition im Container
   */
  onMouseMove(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    
    // Position relativ zum Element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Werte in Prozent (0-100) für den Shine
    this.target.mx = (x / rect.width) * 100;
    this.target.my = (y / rect.height) * 100;

    // Rotation berechnen (Mitte des Bildes ist 0 Grad)
    this.target.ry = ((x / rect.width) - 0.5) * (this.MAX_ROTATE * 2);
    this.target.rx = ((y / rect.height) - 0.5) * -(this.MAX_ROTATE * 2);
  }

  onMouseEnter(): void {
    // Hier könnte man bei Bedarf einen Zoom-Faktor oder Schatten ändern
  }

  /**
   * Setzt die Zielwerte beim Verlassen zurück (Sanftes Zurückschwingen)
   */
  onMouseLeave(): void {
    this.target.rx = 0;
    this.target.ry = 0;
    this.target.mx = 50;
    this.target.my = 50;
  }
}