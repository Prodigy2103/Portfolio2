import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './skill-set.component.html',
  styleUrl: './skill-set.component.scss'
})
export class SkillSetComponent {

  skillIcons = [
    { name: 'HTML', src: 'assets/Extras/icons/HTML.png' },
    { name: 'CSS', src: 'assets/Extras/icons/CSS.png' },
    { name: 'JavaScript', src: 'assets/Extras/icons/JS.png' },
    { name: 'TypeScript', src: 'assets/Extras/icons/TS.png' },
    { name: 'Angular', src: 'assets/Extras/icons/Angular.png' },
    { name: 'Firebase', src: 'assets/Extras/icons/Firebase.png' },
    { name: 'GitHub', src: 'assets/Extras/icons/Git.png' },
    { name: 'Rest-API', src: 'assets/Extras/icons/API.png' },
    { name: 'Scrum', src: 'assets/Extras/icons/Scrum.png' },
    { name: 'Material Design', src: 'assets/Extras/icons/MaterialDesign.png' }
  ];

  peelIcons = [
    { name: 'React', src: 'assets/Extras/icons/icons8-react-native-50.png' },
    { name: 'Vue.js', src: 'assets/Extras/icons/icons8-vuetify-64.png' }
  ];

  isCoverVisible: boolean = true;
}
