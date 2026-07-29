import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize projectList signal with 5 projects', () => {
    expect(component.projectList().length).toBe(5);
  });

  it('should toggle project view', () => {
    component.toggleProjectView('join');
    expect(component.selectedProject()).toBe('join');
    expect(component.showProjectView()).toBeTrue();
  });

  it('should close project view', () => {
    component.closeProjectView();
    expect(component.showProjectView()).toBeFalse();
  });
});
