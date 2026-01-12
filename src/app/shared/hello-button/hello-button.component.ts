import { Component, ChangeDetectionStrategy, HostListener, signal, WritableSignal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hello-button',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hello-button.component.html',
  styleUrl: './hello-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelloButtonComponent {
  /**
   * Signal representing the hover state of the button.
   * Controls whether the waving hand animation is currently active.
   * * @type {WritableSignal<boolean>}
   */
  isWaving: WritableSignal<boolean> = signal(false);

  /**
   * Host Listener triggered when the mouse enters the button area.
   * Starts the waving animation by setting the signal state to true.
   * This will apply the '.is-waving' class to the button element.
   * * @returns {void}
   * @listens mouseenter
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isWaving.set(true);
  }

  /**
   * Host Listener triggered when the mouse leaves the button area.
   * Stops the waving animation by setting the signal state back to false.
   * This will remove the '.is-waving' class from the button element.
   * * @returns {void}
   * @listens mouseleave
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isWaving.set(false);
  }
}