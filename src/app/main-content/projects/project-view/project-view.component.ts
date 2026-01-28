import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss'
})
export class ProjectViewComponent {
  @Output() closeEvent = new EventEmitter<void | string>();
  @Input() currentProject: string = '';
  projects = ['join', 'pepe', 'pokeDex'];

  skillIcons: any = {
    join: [{ name: 'Angular', src: 'assets/Extras/icons/Angular.png' }, { name: 'Firebase', src: 'assets/Extras/icons/Firebase.png' }, { name: 'TypeScript', src: 'assets/Extras/icons/TS.png' }],
    pepe: [{ name: 'JavaScript', src: 'assets/Extras/icons/JS.png' }, { name: 'HTML', src: 'assets/Extras/icons/HTML.png' }, { name: 'CSS', src: 'assets/Extras/icons/CSS.png' }],
    pokeDex: [{ name: 'JavaScript', src: 'assets/Extras/icons/JS.png' }, { name: 'Rest-API', src: 'assets/Extras/icons/HTML.png' }]
  };

  get currentSkills() { return this.skillIcons[this.currentProject] || []; }
  
  get currentImg() {
    const imgs: any = { join: 'assets/ProjectsImg/join.png', pepe: 'assets/ProjectsImg/Pepe30.png', pokeDex: 'assets/ProjectsImg/Component 30.png' };
    return imgs[this.currentProject];
  }

  getGithubLink() {
    const links: any = { 'join': 'https://github.com/Prodigy2103/join.git', 'pepe': 'https://github.com/Prodigy2103/El-Pollo-Loco.git', 'pokeDex': 'https://github.com/Prodigy2103/PokedexNeu.git' };
    return links[this.currentProject];
  }

  getLiveLink() {
    const links: any = { 'join': 'http://join.marcus-guehne.com/index.html', 'pepe': 'http://elpolloloco.marcus-guehne.com/index.html', 'pokeDex': 'https://pokedex.marcus-guehne.com/index.html' };
    return links[this.currentProject];
  }

  goBack() { this.closeEvent.emit(); }

  nextProject() {
    const idx = this.projects.indexOf(this.currentProject);
    this.currentProject = this.projects[(idx + 1) % this.projects.length];
    document.querySelector('.modal-wrapper')?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}