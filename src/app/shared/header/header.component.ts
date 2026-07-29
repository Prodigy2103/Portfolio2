import { Component, Output, EventEmitter, inject, signal, Signal, HostListener } from '@angular/core';
import { ViewportScroller, CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../service/language.service';

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
  scrollProgress = signal(0);

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress.set(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event): void {
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
    { code: 'en', defaultIcon: 'assets/Extras/HeaderLanguage/English Default.png', hoverIcon: 'assets/Extras/HeaderLanguage/English Hover.png', alt: 'English' },
    { code: 'de', defaultIcon: 'assets/Extras/HeaderLanguage/Deutsch Default.png', hoverIcon: 'assets/Extras/HeaderLanguage/Deutsch Hover.png', alt: 'Deutsch' }
  ];

  socialLinks: SocialLink[] = [
    { url: 'https://www.linkedin.com/in/robert-marcus-g%C3%BChne-a53a63385/', icon: 'assets/Extras/icons8-linkedin-52.png', alt: 'LinkedIn Profile', external: true, w: 32, h: 32 },
    { url: 'https://github.com/Prodigy2103', icon: 'assets/Extras/Github.png', alt: 'Github Profile', external: true, w: 32, h: 32 },
    { url: 'mailto:anfrage@marcus-guehne.com', icon: 'assets/Extras/Contact.png', alt: 'Send Email', external: false, w: 32, h: 32 }
  ];

  useLanguage(language: string): void {
    this.languageService.useLanguage(language);
    this.closeMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen.update(current => !current);
    this.updateScrollLock();
  }

  handleNavigation(target: string): void {
    if (this.navigateTo.observed) {
      this.navigateTo.emit(target);
    } else {
      this.scroller.scrollToAnchor(target.substring(1));
    }
    this.closeMenu();
  }

  private updateScrollLock(): void {
    document.body.style.overflow = this.isMenuOpen() ? 'hidden' : 'auto';
  }

  private closeMenu(): void {
    this.isMenuOpen.set(false);
    document.body.style.overflow = 'auto';
  }

  getLanguageIcon(lang: Language): string {
    return this.currentLanguage() === lang.code ? lang.hoverIcon : lang.defaultIcon;
  }

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

  statusText(): string {
    const statusMap: Record<string, string> = { 'open': 'status.ready', 'closing-soon': 'status.busy', 'closed': 'status.offline' };
    return statusMap[this.status()] || 'status.offline';
  }
}