import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [TranslateModule, CommonModule, RouterModule],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent implements OnInit {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Privacy Policy | Marcus Gühne");
  }

  ngOnInit(): void {
    // Scrollt das gesamte Fenster sofort nach oben
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}