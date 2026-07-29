import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroSectionComponent } from './hero-section.component';
import { TranslateModule } from '@ngx-translate/core';

describe('HeroSectionComponent', () => {
  let component: HeroSectionComponent;
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize signals with default values', () => {
    expect(component.frontLetters().length).toBeGreaterThan(0);
    expect(component.devLetters().length).toBeGreaterThan(0);
    expect(component.socialLinks().length).toBe(3);
  });

  it('should update mouse target on mousemove', () => {
    const mockElement = document.createElement('div');
    spyOn(mockElement, 'getBoundingClientRect').and.returnValue({
      left: 0, top: 0, width: 100, height: 100, x: 0, y: 0, bottom: 100, right: 100, toJSON: () => {}
    });

    const mockEvent = {
      currentTarget: mockElement,
      clientX: 50,
      clientY: 50
    } as unknown as MouseEvent;

    component.onMouseMove(mockEvent);
    expect(component.target().mx).toBe(50);
    expect(component.target().my).toBe(50);
  });

  it('should reset mouse target on mouseleave', () => {
    component.onMouseLeave();
    expect(component.target().rx).toBe(0);
    expect(component.target().ry).toBe(0);
  });
});
