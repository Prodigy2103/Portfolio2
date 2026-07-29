import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { colleaguesService } from '../../shared/service/colleagues-service';
import { CommonModule } from '@angular/common';
import { SingleInfoComponent } from './single-info/single-info.component';

@Component({
  selector: 'app-colleagues',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, CommonModule, SingleInfoComponent],
  templateUrl: './colleagues.component.html',
  styleUrl: './colleagues.component.scss'
})
export class ColleaguesComponent {
  private readonly colleaguesService = inject(colleaguesService);

  public readonly colleagues = signal(this.colleaguesService.colleagues);
}
