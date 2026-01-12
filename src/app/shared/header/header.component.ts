import { Component, Output, EventEmitter, inject, signal, Signal } from '@angular/core';
import { ViewportScroller, CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../service/language.service';

// --- Interfaces
interface NavItem {
  anchor: string;
  translationKey: string;
  class: string;
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
// ---

@Component({
  selector: 'app-header',
  standalone: true,
  // ⚡ OnInit entfernt
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  /**
   * Injects the Angular ViewportScroller service for programmatic scrolling to anchor tags.
   * @private
   */
  private scroller = inject(ViewportScroller);
  /**
   * Injects the custom LanguageService, which manages the application's language state 
   * and synchronizes the language loading process.
   * @private
   */
  private languageService = inject(LanguageService);

  /**
   * Event emitter for communicating navigation intents to a parent component (e.g., App component)
   * if observed, instead of directly scrolling.
   * @type {EventEmitter<string>}
   * @output
   */
  @Output() navigateTo = new EventEmitter<string>();

  /**
   * Signal representing the state of the mobile navigation menu.
   * `true` if the menu is open, `false` otherwise.
   * @type {WritableSignal<boolean>}
   */
  isMenuOpen = signal(false);

  /**
   * Readonly Signal for the currently active language code (e.g., 'en', 'de'), 
   * sourced from the LanguageService.
   * @type {Signal<string>}
   */
  currentLanguage: Signal<string> = this.languageService.currentLanguage;

  /**
   * Configuration array for the main navigation links.
   * Used to render the menu items and map them to sections via anchor tags.
   * @type {NavItem[]}
   */
  navItems: NavItem[] = [
    { anchor: '#about', translationKey: 'header.about', class: 'about' },
    { anchor: '#skill', translationKey: 'header.skills', class: 'skills' },
    { anchor: '#projects', translationKey: 'header.projects', class: 'projects' },
    { anchor: '#contact', translationKey: 'header.contact', class: 'contact' }
  ];

  /**
   * Configuration array for available languages, including their display icons.
   * @type {Language[]}
   */
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

  /**
   * Configuration array for external social media and contact links.
   * @type {SocialLink[]}
   */
  socialLinks: SocialLink[] = [
    { url: 'https://www.linkedin.com/in/robert-marcus-g%C3%BChne-a53a63385/', icon: 'assets/Extras/Indeed.png', alt: 'Indeed Profil', external: true },
    { url: 'https://github.com/Prodigy2103', icon: 'assets/Extras/Github.png', alt: 'Github Profil', external: true },
    { url: 'mailto:marcusghne@gmx.de', icon: 'assets/Extras/Contact.png', alt: 'E-Mail Versand', external: false }
  ];

  /**
   * Initiates the language change process via the LanguageService and closes the menu.
   * The LanguageService handles the asynchronous loading and state update.
   * @param {string} language - The language code to switch to (e.g., 'de').
   * @returns {void}
   */
  useLanguage(language: string): void {
    this.languageService.useLanguage(language);
    this.isMenuOpen.set(false);
  }

  /**
   * Toggles the state of the mobile navigation menu.
   * @returns {void}
   */
  toggleMenu(): void {
    this.isMenuOpen.update(current => !current);
  }

  /**
   * Handles navigation to an anchor target.
   * Emits an event if a listener is attached, otherwise uses ViewportScroller for smooth scrolling.
   * Always closes the menu after navigation.
   * @param {string} target - The anchor identifier (e.g., '#about').
   * @returns {void}
   */
  handleNavigation(target: string): void {
    if (this.navigateTo.observed) {
      this.navigateTo.emit(target);
    } else {
      // Scrolls to the anchor tag (e.g., 'about' from '#about')
      this.scroller.scrollToAnchor(target.substring(1));
    }
    this.isMenuOpen.set(false);
  }

  /**
   * Determines the correct icon path (default or hover state) for a language button 
   * based on the current active language signal.
   * @param {Language} lang - The language object being checked.
   * @returns {string} The URL of the appropriate icon image.
   */
  getLanguageIcon(lang: Language): string {
    return this.currentLanguage() === lang.code ? lang.hoverIcon : lang.defaultIcon;
  }
}