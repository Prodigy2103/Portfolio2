import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';

describe('HeaderComponent Image Ratio', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeaderComponent, NgOptimizedImage]
		}).compileComponents();

		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should toggle isScrolled signal on window scroll', () => {
		window.scrollTo(0, 100);
		window.dispatchEvent(new Event('scroll'));

		expect(component.isScrolled()).toBeTrue();
	});

	it('should verify image dimensions', () => {
		const img = fixture.debugElement.query(By.css('.header-logo')).nativeElement;
		expect(img.getAttribute('width')).toBe('350');
		expect(img.getAttribute('height')).toBe('155');
	});
});