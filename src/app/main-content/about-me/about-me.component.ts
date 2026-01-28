import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface AboutInfo {
  class: string;
  background: string;
  alt: string;
  icon: string;
  iconAlt: string;
  containerClass: string;
  translationKey: string;
}

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})

export class AboutMeComponent {
  aboutInfo = [
    { title: 'Based in Oschatz/Saxony', icon: 'bi bi-geo-alt', colorClass: 'neon', translationKey: 'about.location' },
    { title: 'Open to new projects', icon: 'bi bi-briefcase', colorClass: 'blue', translationKey: 'about.relocation' },
    { title: 'Open to work remote', icon: 'bi bi-globe', colorClass: 'orange', translationKey: 'about.remote' }
  ];
}