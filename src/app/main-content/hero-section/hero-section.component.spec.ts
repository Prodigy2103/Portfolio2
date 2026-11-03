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

  it('should initialize social links and name letters', () => {
    expect(component.nameLetters().length).toBeGreaterThan(0);
    expect(component.socialLinks().length).toBe(3);
  });

  it('should update mouse coordinates on mousemove', () => {
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
    expect(component.mouseX()).toBe(0);
    expect(component.mouseY()).toBe(0);
    expect(component.isHovering()).toBe(true);
  });

  it('should reset hover state on mouseleave', () => {
    component.onMouseLeave();
    expect(component.isHovering()).toBe(false);
  });
});
