import {
  Component,
  ElementRef,
  ViewChild,
  signal,
  inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectViewComponent } from "./project-view/project-view.component";

export interface ProjectItem {
  id: string;
  title: string;
  img: string;
  descKey: string;
  tags: string[];
  github: string;
  live: string;
  workInProgress?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule, ProjectViewComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private readonly scroller = inject(ViewportScroller);

  @ViewChild('projectSlider') sliderRef!: ElementRef<HTMLDivElement>;

  public readonly showProjectView = signal(false);
  public readonly selectedProject = signal('');

  public readonly projectList = signal<ProjectItem[]>([
    {
      id: 'join',
      title: 'Join',
      img: 'assets/ProjectsImg/join.webp',
      descKey: 'projects.join.descriptionOne',
      tags: ['JavaScript', 'Firebase', 'HTML', 'CSS'],
      github: 'https://github.com/Prodigy2103/join.git',
      live: 'http://join.marcus-guehne.com/index.html'
    },
    {
      id: 'pepe',
      title: 'El Pollo Loco',
      img: 'assets/ProjectsImg/Pepe30.webp',
      descKey: 'projects.pepe.descriptionOne',
      tags: ['JavaScript', 'Canvas', 'OOP'],
      github: 'https://github.com/Prodigy2103/El-Pollo-Loco.git',
      live: 'http://elpolloloco.marcus-guehne.com/index.html'
    },
    {
      id: 'pokeDex',
      title: 'Pokédex',
      img: 'assets/ProjectsImg/Component 30.webp',
      descKey: 'projects.pokeDex.descriptionOne',
      tags: ['JavaScript', 'REST-API', 'HTML'],
      github: 'https://github.com/Prodigy2103/PokedexNeu.git',
      live: 'https://pokedex.marcus-guehne.com/index.html'
    },
    {
      id: 'wasiri',
      title: 'Riesenimbiss Riesa',
      img: 'assets/ProjectsImg/ImbissMain.webp',
      descKey: 'projects.wasiri.descriptionOne',
      tags: ['Angular', 'TypeScript', 'HTML', 'Firebase', 'SCSS'],
      github: 'https://github.com/Prodigy2103/RiesaRiesenImbiss_NEW.git',
      live: 'https://riesenimbiss.de/'
    },
    {
      id: 'truck',
      title: 'Truckmanagement',
      img: 'assets/ProjectsImg/truck1.webp',
      descKey: 'projects.truck.descriptionOne',
      tags: ['Angular', 'TypeScript', 'HTML', 'Supabase', 'SCSS'],
      github: 'https://github.com/Prodigy2103/truck-tracker.git',
      live: 'https://truck-tracker.marcus-guehne.com/',
      workInProgress: true
    }
  ]);

  public scrollSlider(direction: 'left' | 'right'): void {
    if (!this.sliderRef) return;
    const scrollAmount = direction === 'left' ? -450 : 450;
    this.sliderRef.nativeElement.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  public toggleProjectView(projectId: string): void {
    this.selectedProject.set(projectId);
    this.showProjectView.set(true);
    document.body.classList.add('no-scroll');
  }

  public closeProjectView(target?: string | void): void {
    this.showProjectView.set(false);
    document.body.classList.remove('no-scroll');
    if (typeof target === 'string' && target) {
      setTimeout(() => this.scroller.scrollToAnchor(target.substring(1)), 0);
    }
  }
}