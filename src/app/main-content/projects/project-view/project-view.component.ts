import { Component, input, output, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

export interface SkillIcon {
  name: string;
  src: string;
}

@Component({
  selector: 'app-project-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss'
})
export class ProjectViewComponent {
  public readonly closeEvent = output<void>();
  public readonly projectChangeEvent = output<string>();
  public readonly currentProject = input<string>('');

  public readonly projectOrder = signal<string[]>(['join', 'pepe', 'pokeDex', 'wasiri', 'truck']);

  public readonly skillIconMap: Record<string, SkillIcon[]> = {
    join: [{ name: 'Angular', src: 'assets/Extras/icons/Angular.png' }, { name: 'Firebase', src: 'assets/Extras/icons/Firebase.png' }, { name: 'TypeScript', src: 'assets/Extras/icons/TS.png' }],
    pepe: [{ name: 'JavaScript', src: 'assets/Extras/icons/JS.png' }, { name: 'HTML', src: 'assets/Extras/icons/HTML.png' }, { name: 'CSS', src: 'assets/Extras/icons/CSS.png' }],
    pokeDex: [{ name: 'JavaScript', src: 'assets/Extras/icons/JS.png' }, { name: 'Rest-API', src: 'assets/Extras/icons/HTML.png' }],
    wasiri: [{ name: 'Typescript', src: 'assets/Extras/icons/TS.png' }, { name: 'Angular', src: 'assets/Extras/icons/Angular.png' }, { name: 'Firebase', src: 'assets/Extras/icons/Firebase.png' }],
    truck: [{ name: 'Typescript', src: 'assets/Extras/icons/TS.png' }, { name: 'Angular', src: 'assets/Extras/icons/Angular.png' }, { name: 'Supabase', src: 'assets/Extras/icons/Supabase.png' }]
  };

  public readonly imgMap: Record<string, string> = {
    join: 'assets/ProjectsImg/join.webp',
    pepe: 'assets/ProjectsImg/Pepe30.webp',
    pokeDex: 'assets/ProjectsImg/Component 30.webp',
    wasiri: 'assets/ProjectsImg/ImbissOrder.webp',
    truck: 'assets/ProjectsImg/truck2.webp'
  };

  public readonly githubMap: Record<string, string> = {
    join: 'https://github.com/Prodigy2103/join.git',
    pepe: 'https://github.com/Prodigy2103/El-Pollo-Loco.git',
    pokeDex: 'https://github.com/Prodigy2103/PokedexNeu.git',
    wasiri: 'https://github.com/Prodigy2103/RiesaRiesenImbiss_NEW.git',
    truck: 'https://github.com/Prodigy2103/truck-tracker.git'
  };

  public readonly liveMap: Record<string, string> = {
    join: 'http://join.marcus-guehne.com/index.html',
    pepe: 'http://elpolloloco.marcus-guehne.com/index.html',
    pokeDex: 'https://pokedex.marcus-guehne.com/index.html',
    wasiri: 'https://riesenimbiss.de/#/order',
    truck: 'https://truck-tracker.marcus-guehne.com'
  };

  public readonly currentSkills = computed(() => this.skillIconMap[this.currentProject()] || []);
  public readonly currentImg = computed(() => this.imgMap[this.currentProject()] || '');
  public readonly currentGithub = computed(() => this.githubMap[this.currentProject()] || '');
  public readonly currentLive = computed(() => this.liveMap[this.currentProject()] || '');

  public goBack(): void {
    this.closeEvent.emit();
  }

  public nextProject(): void {
    const list = this.projectOrder();
    const idx = list.indexOf(this.currentProject());
    const nextId = list[(idx + 1) % list.length];
    this.scrollModalTop();
    this.projectChangeEvent.emit(nextId);
  }

  public prevProject(): void {
    const list = this.projectOrder();
    const idx = list.indexOf(this.currentProject());
    const prevId = list[(idx - 1 + list.length) % list.length];
    this.scrollModalTop();
    this.projectChangeEvent.emit(prevId);
  }

  private scrollModalTop(): void {
    document.querySelector('.modal-inner')?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}