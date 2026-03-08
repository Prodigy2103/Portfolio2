import { Component, Output, EventEmitter, inject, signal, Signal, HostListener } from '@angular/core';
import { ViewportScroller, CommonModule, NgOptimizedImage } from '@angular/common';
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
  w: number;
  h: number;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private scroller = inject(ViewportScroller);
  private languageService = inject(LanguageService);

  @Output() navigateTo = new EventEmitter<string>();

  isMenuOpen = signal(false);

  isScrolled = signal(false);

  /**
   * Monitors the window scroll position to toggle header styling.
   * Updates a signal to apply 'scrolled' classes (e.g., for background blur or size reduction)
   * once the user moves past a 50px threshold.
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }

  /**
   * Responsive guard: Automatically closes the mobile navigation menu when the 
   * viewport is expanded beyond the mobile breakpoint (768px).
   * Prevents layout inconsistencies when switching from mobile to desktop view.
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth >= 768 && this.isMenuOpen()) {
      this.closeMenu();
    }
  }

  /** Signal reflecting the currently active language code from the translation service. */
  currentLanguage: Signal<string> = this.languageService.currentLanguage;

  /** Navigation structure defined for the header links with translation and accessibility keys. */
  navItems: NavItem[] = [
    { anchor: '#about', translationKey: 'header.about', titleKey: 'header.aboutTitle', class: 'about' },
    { anchor: '#skill', translationKey: 'header.skills', titleKey: 'header.skillsTitle', class: 'skills' },
    { anchor: '#projects', translationKey: 'header.projects', titleKey: 'header.projectsTitle', class: 'projects' },
    { anchor: '#contact', translationKey: 'header.contact', titleKey: 'header.contactTitle', class: 'contact' }
  ];

  /** Language configuration including assets for interactive hover/active states. */
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

  /** Social media profiles with explicit dimensions to prevent Layout Shift (CLS). */
  socialLinks: SocialLink[] = [
    {
      url: 'https://www.linkedin.com/in/robert-marcus-g%C3%BChne-a53a63385/',
      icon: 'assets/Extras/icons8-linkedin-52.png',
      alt: 'LinkedIn Profile',
      external: true,
      w: 32, h: 32
    },
    {
      url: 'https://github.com/Prodigy2103',
      icon: 'assets/Extras/Github.png',
      alt: 'Github Profile',
      external: true,
      w: 32, h: 32
    },
    {
      url: 'mailto:anfrage@marcus-guehne.com',
      icon: 'assets/Extras/Contact.png',
      alt: 'Send Email',
      external: false,
      w: 32, h: 32
    }
  ];

  /** * Triggers a language switch via the global language service 
   * and ensures the mobile menu is closed to provide a clean transition.
   */
  useLanguage(language: string): void {
    this.languageService.useLanguage(language);
    this.closeMenu();
  }

  /** * Toggles the mobile menu state and synchronizes the body scroll lock 
   * to prevent background scrolling while the menu is active.
   */
  toggleMenu(): void {
    this.isMenuOpen.update(current => !current);
    this.updateScrollLock();
  }

  /** * Manages anchor-based navigation. 
   * Prioritizes parent-level navigation logic (if observed) or uses the 
   * internal scroller, ensuring the mobile menu closes after selection.
   */
  handleNavigation(target: string): void {
    if (this.navigateTo.observed) {
      this.navigateTo.emit(target);
    } else {
      this.scroller.scrollToAnchor(target.substring(1));
    }
    this.closeMenu();
  }

  /** * Synchronizes the HTML body's overflow style with the menu state 
   * to maintain a high-quality User Experience (Scroll Locking).
   */
  private updateScrollLock(): void {
    if (this.isMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  /** Central helper to reset the menu state and restore window scrolling. */
  private closeMenu(): void {
    this.isMenuOpen.set(false);
    document.body.style.overflow = 'auto';
  }

  /** Logic to determine the correct language icon based on the current selection. */
  getLanguageIcon(lang: Language): string {
    return this.currentLanguage() === lang.code ? lang.hoverIcon : lang.defaultIcon;
  }

  /** * Calculates the availability status based on business hours (Mon-Fri, 9-12 & 14-17).
   * @returns 'open', 'closing-soon' (within 30 mins of break/close), or 'closed' (weekend/off-hours).
   */
  status(): string {
  const now = new Date();
  const day = now.getDay();
  const hr = now.getHours() + now.getMinutes() / 60;
  
  if (day === 0 || day === 6) return 'closed';
  
  const shifts = [[9, 12], [14, 17]];
  const active = shifts.find(([open, close]) => hr >= open && hr < close);
  
  if (!active) return 'closed';
  return (active[1] - hr <= 0.5) ? 'closing-soon' : 'open';
}

  /** * Maps the raw availability state to its corresponding translation key 
   * for consistent multi-language support.
   */
  statusText(): string {
    const currentStatus = this.status();
    const statusMap: Record<string, string> = {
      'open': 'status.ready',
      'closing-soon': 'status.busy',
      'closed': 'status.offline'
    };
    return statusMap[currentStatus] || 'status.offline';
  }
}