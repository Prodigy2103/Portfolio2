import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectViewComponent } from './project-view.component';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentRef } from '@angular/core';

describe('ProjectViewComponent', () => {
  let component: ProjectViewComponent;
  let fixture: ComponentFixture<ProjectViewComponent>;
  let componentRef: ComponentRef<ProjectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectViewComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectViewComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('currentProject', 'join');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should compute project details correctly', () => {
    expect(component.currentImg()).toContain('join.webp');
    expect(component.currentGithub()).toContain('join.git');
  });

  it('should emit close event on goBack', () => {
    spyOn(component.closeEvent, 'emit');
    component.goBack();
    expect(component.closeEvent.emit).toHaveBeenCalled();
  });

  it('should emit projectChangeEvent on nextProject', () => {
    spyOn(component.projectChangeEvent, 'emit');
    component.nextProject();
    expect(component.projectChangeEvent.emit).toHaveBeenCalledWith('pepe');
  });

  it('should emit projectChangeEvent on prevProject', () => {
    spyOn(component.projectChangeEvent, 'emit');
    component.prevProject();
    expect(component.projectChangeEvent.emit).toHaveBeenCalledWith('truck');
  });
});
