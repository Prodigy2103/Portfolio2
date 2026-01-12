import { Component, EventEmitter, Output, Input } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from "../../../shared/footer/footer.component";

@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeaderComponent],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss'
})
export class ProjectViewComponent {
  // Attributes

  /**
   * Event emitter triggered when the component needs to be closed.
   * Emits either 'void' for a standard close action or a 'string'
   * containing a navigation anchor target (e.g., '#about') if navigation
   * through the header is requested.
   * @type {EventEmitter<void | string>}
   */
  @Output() closeEvent = new EventEmitter<void | string>();

  /**
   * The unique identifier (ID) of the project currently displayed in the view.
   * @type {string}
   */
  @Input() currentProject: string = '';

  /**
   * List of available project identifiers, used for project navigation (e.g., next/previous).
   * @type {string[]}
   */
  projects: string[] = ['join', 'pepe', 'pokeDex'];

  /**
   * Defines the skills and corresponding icon paths for the 'pepe' project.
   * @type {Array<{name: string, src: string}>}
   */
  skillIconsPepe = [
    { name: 'JavaScript', src: 'assets/Extras/icons/JS.png' },
    { name: 'HTML', src: 'assets/Extras/icons/HTML.png' },
    { name: 'CSS', src: 'assets/Extras/icons/CSS.png' }
  ];

  /**
   * Defines the skills and corresponding icon paths for the 'join' project.
   * @type {Array<{name: string, src: string}>}
   */
  skillIconsJoin = [
    { name: 'CSS', src: 'assets/Extras/icons/CSS.png' },
    { name: 'HTML', src: 'assets/Extras/icons/HTML.png' },
    { name: 'Firebase', src: 'assets/Extras/icons/Firebase.png' },
    { name: 'Angular', src: 'assets/Extras/icons/Angular.png' },
    { name: 'TypeScript', src: 'assets/Extras/icons/TS.png' },
  ];

  /**
   * Defines the skills and corresponding icon paths for the 'pokeDex' project.
   * @type {Array<{name: string, src: string}>}
   */
  skillIconspokeDex = [
    { name: 'JavaScript', src: 'assets/Extras/icons/JS.png' },
    { name: 'HTML', src: 'assets/Extras/icons/HTML.png' },
    { name: 'CSS', src: 'assets/Extras/icons/CSS.png' }
  ];

  /**
   * Flag indicating the current state of a menu (open or closed).
   * @type {boolean}
   */
  isMenuOpen = false;

  // methods

  /**
   * Emits the standard close event (void) to notify the parent component
   * that the project view should be dismissed.
   * @returns {void}
   */
  goBack(): void {
    this.closeEvent.emit();
  }

  /**
   * Handles the navigation event received from the embedded header component.
   * It re-emits the target anchor via `closeEvent` to instruct the parent
   * component to close the view and then navigate to the specified section.
   * @param {string} target The anchor target (e.g., '#about', '#skill').
   * @returns {void}
   */
  handleHeaderNavigation(target: string): void {
    this.closeEvent.emit(target);
  }

  /**
   * Toggles the state of the local menu, switching it between open (true) and closed (false).
   * @returns {void}
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Updates the {@link currentProject} to the next project in the {@link projects} array.
   * Wraps around to the first project if the current project is the last one in the list.
   * @returns {void}
   */
  nextProject(): void {
    const currentIndex = this.projects.indexOf(this.currentProject);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % this.projects.length;
      this.currentProject = this.projects[nextIndex];
    }
  }
}