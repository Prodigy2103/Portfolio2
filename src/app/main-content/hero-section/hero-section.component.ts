import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export class HeroSectionComponent {
  frontLetters = 'Frontend'.split('');
  devLetters = 'DEVELOPER'.split('');

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
}