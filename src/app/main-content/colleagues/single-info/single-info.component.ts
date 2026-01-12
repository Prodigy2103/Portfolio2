import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { colleaguesOne } from '../../../shared/interface/colleagues-interface';

@Component({
  selector: 'app-single-info',
  imports: [CommonModule, TranslateModule],
  templateUrl: './single-info.component.html',
  styleUrl: './single-info.component.scss'
})
export class SingleInfoComponent {

  @Input() singleperson!: colleaguesOne;

}
