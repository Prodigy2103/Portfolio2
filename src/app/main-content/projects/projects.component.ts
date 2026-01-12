import { CommonModule, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectViewComponent } from "./project-view/project-view.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule, ProjectViewComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  /**
   * Constructor for the ProjectsComponent.
   * @param {ViewportScroller} scroller Angular service used to manage scrolling and navigating to anchors.
   */
  constructor(
    private scroller: ViewportScroller
  ) { }

  /**
   * Controls the visibility of the detailed project view (overlay/modal).
   * When true, the ProjectViewComponent is shown.
   * @type {boolean}
   */
  showProjectView: boolean = false;

  /**
   * Stores the unique identifier (ID) of the project currently selected for viewing.
   * @type {string}
   */
  selectedProject: string = '';

  /**
   * Opens the detailed project view for a specific project ID.
   * It sets the selected project ID, displays the view, and disables scrolling on the main body
   * by adding the 'no-scroll' class to prevent background movement while the overlay is open.
   *
   * @param {string} projectId - The unique identifier of the project to be displayed.
   * @returns {void}
   */
  toggleProjectView(projectId: string): void {
    this.selectedProject = projectId;
    this.showProjectView = true;
    document.body.classList.add('no-scroll');
  }

  /**
   * Closes the Project View overlay and optionally scrolls the main page to a specified anchor.
   * This method is typically called by the ProjectViewComponent's closeEvent.
   *
   * @param {string | void} [target] - The navigation target anchor (e.g., '#about') emitted by the header, or void if it's a standard close action (like 'Go Back').
   * @returns {void}
   */
  closeProjectView(target?: string | void): void {
    this.showProjectView = false;
    // Re-enables scrolling on the main body.
    document.body.classList.remove('no-scroll');

    // Check if a navigation target was passed (indicating a click on a header link)
    if (typeof target === 'string' && target) {
      // Use setTimeout(0) to ensure the DOM is updated (overlay is removed) 
      // before attempting to scroll to the anchor.
      setTimeout(() => {
        this.scroller.scrollToAnchor(target.substring(1));
      }, 0);
    }
  }
}