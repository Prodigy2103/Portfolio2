import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

interface AboutInfo {
  svgPath: string;
  colorClass: string;
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
  isVisible = false;
  aboutInfo: AboutInfo[] = [
    {
      // Das ist der Pfad für das Geo-Icon (Location)
      svgPath: 'M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6',
      colorClass: 'neon-card',
      translationKey: 'about.location'
    },
    {
      // Blitz-Icon (Relocation)
      svgPath: 'M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z',
      colorClass: 'blue-card',
      translationKey: 'about.relocation'
    },
    {
      // CPU-Icon (Remote)
      svgPath: 'M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2 2 0 0 1 14 4h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2 2 0 0 1-2 2v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14a2 2 0 0 1-2-2H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2a2 2 0 0 1 2-2V.5a.5.5 0 0 1 .5-.5z',
      colorClass: 'orange-card',
      translationKey: 'about.remote'
    }
  ];

  constructor(private textSide: ElementRef) { }

  ngOnInit(): void {
    // Sicherheitscheck: Existiert das Element?
    if (!this.textSide) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          // Animation auslösen und Observer stoppen
          observer.unobserve(entry.target);
        }
      });
    }, {
      // 0.1 oder 0.2 ist der "Sweet Spot" für Mobile
      threshold: 0.5
    });

    observer.observe(this.textSide.nativeElement);
  }
}