import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TranslateModule],
  templateUrl: './skill-set.component.html',
  styleUrl: './skill-set.component.scss'
})
export class SkillSetComponent {

  skillIcons = [
    { name: 'HTML', src: 'assets/Extras/icons/HTML.png', w: 40, h: 40 },
    { name: 'CSS', src: 'assets/Extras/icons/CSS.png', w: 40, h: 40 },
    { name: 'JavaScript', src: 'assets/Extras/icons/JS.png', w: 40, h: 40 },
    { name: 'TypeScript', src: 'assets/Extras/icons/TS.png', w: 40, h: 40 },
    { name: 'Angular', src: 'assets/Extras/icons/Angular.png', w: 40, h: 40 },
    { name: 'Firebase', src: 'assets/Extras/icons/Firebase.png', w: 40, h: 40 },
    { name: 'GitHub', src: 'assets/Extras/icons/Git.png', w: 40, h: 40 },
    { name: 'Rest-API', src: 'assets/Extras/icons/API.png', w: 40, h: 40 },
    { name: 'Scrum', src: 'assets/Extras/icons/Scrum.png', w: 40, h: 40 },
    { name: 'Material Design', src: 'assets/Extras/icons/MaterialDesign.png', w: 40, h: 40 }
  ];

  peelIcons = [
    { name: 'React', src: 'assets/Extras/icons/icons8-react-native-50.png', w: 50, h: 50 },
    { name: 'Vue.js', src: 'assets/Extras/icons/icons8-vuetify-64.png', w: 64, h: 64 }
  ];

  isCoverVisible: boolean = true;
}
