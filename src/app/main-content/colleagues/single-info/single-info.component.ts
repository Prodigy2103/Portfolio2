import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { colleaguesOne } from '../../../shared/interface/colleagues-interface';

@Component({
  selector: 'app-single-info',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule],
  templateUrl: './single-info.component.html',
  styleUrl: './single-info.component.scss'
})
export class SingleInfoComponent {
  public readonly singleperson = input.required<colleaguesOne>();
}
