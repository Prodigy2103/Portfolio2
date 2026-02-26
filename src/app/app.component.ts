import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from "./shared/footer/footer.component";
import { Title } from '@angular/platform-browser'; // Import für den Seitentitel

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TranslateModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  // Entferne oder ändere das generische 'Portfolio', um Verwirrung zu vermeiden
  title = 'Marcus Gühne | Frontend Developer';

  constructor(
    private translate: TranslateService,
    private titleService: Title // Service injizieren
  ) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');

    // Tippfehler korrigiert: Punkt statt Komma
    this.translate.use('en');
  }

  ngOnInit(): void {
    // Setzt den Titel beim Initialisieren explizit, falls Angular ihn überschreibt
    this.updateTitle();
  }

  useLanguage(language: string): void {
    this.translate.use(language).subscribe(() => {
      this.updateTitle(); // Titel aktualisieren, wenn Sprache gewechselt wird
    });
  }

  private updateTitle(): void {
    // Hier kannst du den Titel sogar übersetzen lassen, wenn du möchtest
    // Für den Anfang fixieren wir ihn so, dass Lighthouse zufrieden ist:
    this.titleService.setTitle('Marcus Gühne | Frontend Developer & Web Design');
  }
}