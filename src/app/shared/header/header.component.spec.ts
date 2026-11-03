import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

describe('HeaderComponent Image Ratio', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, NgOptimizedImage, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isScrolled signal on onWindowScroll', () => {
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(100);
    component.onWindowScroll();
    expect(component.isScrolled()).toBeTrue();
  });

  it('should render status chip in logo container', () => {
    const chip = fixture.debugElement.query(By.css('.status-chip'));
    expect(chip).toBeTruthy();
  });
});