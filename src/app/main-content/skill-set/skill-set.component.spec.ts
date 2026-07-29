import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillSetComponent } from './skill-set.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SkillSetComponent', () => {
  let component: SkillSetComponent;
  let fixture: ComponentFixture<SkillSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillSetComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SkillSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize skillIcons signal with skills list', () => {
    expect(component.skillIcons().length).toBeGreaterThan(0);
  });

  it('should toggle cover state', () => {
    expect(component.isCoverVisible()).toBeTrue();
    component.toggleCover();
    expect(component.isCoverVisible()).toBeFalse();
  });
});
