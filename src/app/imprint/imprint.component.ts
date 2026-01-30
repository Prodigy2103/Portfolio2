import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-imprint',
  imports: [TranslateModule, CommonModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {
  constructor(private titleService: Title) {
  this.titleService.setTitle("Impressum | Marcus Gühne");
}
}
