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
  aboutInfo: AboutInfo[] = [
    {
      class: 'yellow-pic',
      background: 'assets/02_Ripped Paper/Option 1/Yellowsmall.png',
      alt: 'Yellow paper background',
      icon: 'assets/Extras/Location.png',
      iconAlt: 'Location icon',
      containerClass: 'location-container',
      translationKey: 'about.location'
    },
    {
      class: 'blue-pic',
      background: 'assets/02_Ripped Paper/Option 1/2 Bluesmall.png',
      alt: 'Blue paper background',
      icon: 'assets/Extras/Relocation.png',
      iconAlt: 'Relocation icon',
      containerClass: 'relocation-container',
      translationKey: 'about.relocation'
    },
    {
      class: 'orange-pic',
      background: 'assets/02_Ripped Paper/Option 1/3 Orangesmall.png',
      alt: 'Orange paper background',
      icon: 'assets/Extras/Remote.png',
      iconAlt: 'Remote work icon',
      containerClass: 'remote-container',
      translationKey: 'about.remote'
    }
  ];
}
