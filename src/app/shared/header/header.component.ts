import { Component, Output, EventEmitter, inject, signal, Signal, HostListener } from '@angular/core';
import { ViewportScroller, CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../service/language.service';

// --- Interfaces
interface NavItem {
  anchor: string;
  translationKey: string;
  class: string;
  titleKey: string;
}

interface Language {
  code: string;
  defaultIcon: string;
  hoverIcon: string;
  alt: string;
}

interface SocialLink {
  url: string;
  icon: string;
  alt: string;
  external: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private scroller = inject(ViewportScroller);
  private languageService = inject(LanguageService);

  @Output() navigateTo = new EventEmitter<string>();

  /** Signal für den mobilen Menü-Status */
  isMenuOpen = signal(false);

  /** Signal für den Scroll-Status (Header Hintergrund-Wechsel) */
  isScrolled = signal(false);

  /** Überwacht die Scroll-Position für das Header-Styling */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  /**
   * Schließt das Menü automatisch, wenn die Bildschirmgröße 
   * über den Mobile-Breakpoint (768px) hinaus vergrößert wird.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth >= 768 && this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  currentLanguage: Signal<string> = this.languageService.currentLanguage;

  navItems: NavItem[] = [
  { anchor: '#about', translationKey: 'header.about', titleKey: 'header.aboutTitle', class: 'about' },
  { anchor: '#skill', translationKey: 'header.skills', titleKey: 'header.skillsTitle', class: 'skills' },
  { anchor: '#projects', translationKey: 'header.projects', titleKey: 'header.projectsTitle', class: 'projects' },
  { anchor: '#contact', translationKey: 'header.contact', titleKey: 'header.contactTitle', class: 'contact' }
];

  languages: Language[] = [
    {
      code: 'en',
      defaultIcon: 'assets/Extras/HeaderLanguage/English Default.png',
      hoverIcon: 'assets/Extras/HeaderLanguage/English Hover.png',
      alt: 'English'
    },
    {
      code: 'de',
      defaultIcon: 'assets/Extras/HeaderLanguage/Deutsch Default.png',
      hoverIcon: 'assets/Extras/HeaderLanguage/Deutsch Hover.png',
      alt: 'Deutsch'
    }
  ];

  socialLinks: SocialLink[] = [
    { url: 'https://www.linkedin.com/in/robert-marcus-g%C3%BChne-a53a63385/', icon: 'assets/Extras/icons8-linkedin-52.png', alt: 'Indeed Profil', external: true },
    { url: 'https://github.com/Prodigy2103', icon: 'assets/Extras/Github.png', alt: 'Github Profil', external: true },
    { url: 'mailto:marcusghne@gmx.de', icon: 'assets/Extras/Contact.png', alt: 'E-Mail Versand', external: false }
  ];

  /** Wechselt die Sprache und schließt das Menü sauber */
  useLanguage(language: string): void {
    this.languageService.useLanguage(language);
    this.closeMenu();
  }

  /** Schaltet das mobile Menü um und aktiviert/deaktiviert Scroll-Lock */
  toggleMenu(): void {
    this.isMenuOpen.update(current => !current);
    this.updateScrollLock();
  }

  /** Navigiert zu einem Anchor und schließt das Menü sauber */
  handleNavigation(target: string): void {
    if (this.navigateTo.observed) {
      this.navigateTo.emit(target);
    } else {
      this.scroller.scrollToAnchor(target.substring(1));
    }
    this.closeMenu();
  }

  /** Private Hilfsmethode für konsistenten Scroll-Lock-Status */
  private updateScrollLock(): void {
    if (this.isMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  /** Hilfsmethode zum Schließen des Menüs von überall aus */
  private closeMenu(): void {
    this.isMenuOpen.set(false);
    document.body.style.overflow = 'auto';
  }

  getLanguageIcon(lang: Language): string {
    return this.currentLanguage() === lang.code ? lang.hoverIcon : lang.defaultIcon;
  }
}