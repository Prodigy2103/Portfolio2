/**
 * @fileoverview This file contains the HighlightDirective, which applies a visual highlight
 * to an element when the user hovers over it.
 */

import { Directive, HostBinding, HostListener } from '@angular/core';

/**
 * A standalone attribute directive that applies a CSS class ('is-hover') to the host element
 * when the mouse enters, and removes it when the mouse leaves.
 *
 * It uses the selector `[appHighlight]` to be applied as an attribute in HTML.
 *
 * @example
 * ```html
 * <p appHighlight>This text will be highlighted on hover.</p>
 * ```
 */
@Directive({
    selector: '[appHighlight]',
    standalone: true
})
export class HighlightDirective {
    /**
     * Binds the state of this property to the presence of the CSS class 'is-hover' on the host element.
     * When `isHovered` is true, the class is added; otherwise, it is removed.
     */
    @HostBinding('class.isHover') isHovered: boolean = false;

    /**
     * Listens for the `mouseenter` event on the host element.
     * Sets `isHovered` to true, which applies the 'is-hover' CSS class.
     */
    @HostListener('mouseenter') onMouseEnter(): void {
        this.isHovered = true;
    }

    /**
     * Listens for the `mouseleave` event on the host element.
     * Sets `isHovered` to false, which removes the 'is-hover' CSS class.
     */
    @HostListener('mouseleave') onMouseLeave(): void {
        this.isHovered = false;
    }
}