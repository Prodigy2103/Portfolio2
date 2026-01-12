import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { colleaguesService } from '../../shared/service/colleagues-service';
import { CommonModule } from '@angular/common';
import { SingleInfoComponent } from './single-info/single-info.component';

@Component({
  selector: 'app-colleagues',
  imports: [TranslateModule, CommonModule, SingleInfoComponent],
  templateUrl: './colleagues.component.html',
  styleUrl: './colleagues.component.scss'
})
export class ColleaguesComponent {
  // Injection of the colleague data service.
  colleaguesList = inject(colleaguesService)

/**
 * Initializes and retrieves the colleague objects (person1, person2, person3) 
 * from the injected ColleagueService based on their predefined IDs (1, 2, and 3).
 * * @property {Colleague | undefined} person - The colleague object with ID 1, ID 2 and ID 3.
 * * @private
 */
  person1 = this.colleaguesList.colleagues.find(person => person.id == 1);
  person2 = this.colleaguesList.colleagues.find(person => person.id == 2);
  person3 = this.colleaguesList.colleagues.find(person => person.id == 3);
}
