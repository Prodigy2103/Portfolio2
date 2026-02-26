import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent implements OnInit, OnDestroy {
  private readonly canonicalUrl = 'https://marcus-guehne.com/imprint';

  constructor(
    private titleService: Title,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.titleService.setTitle("Impressum | Marcus Gühne");
  }

  ngOnInit(): void {
    this.setCanonicalURL(this.canonicalUrl);
  }

  ngOnDestroy(): void {
    this.removeCanonicalURL();
  }

  private setCanonicalURL(url: string): void {
    let link: HTMLLinkElement | null = this.doc.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private removeCanonicalURL(): void {
    const link = this.doc.querySelector('link[rel="canonical"]');
    if (link) {
      this.doc.head.removeChild(link);
    }
  }
}