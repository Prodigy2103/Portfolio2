import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleInfoComponent } from './single-info.component';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentRef } from '@angular/core';

describe('SingleInfoComponent', () => {
  let component: SingleInfoComponent;
  let fixture: ComponentFixture<SingleInfoComponent>;
  let componentRef: ComponentRef<SingleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleInfoComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleInfoComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('singleperson', {
      id: 1,
      name: 'Marco E.',
      position: 'Frontend Developer',
      person: 'Test Quote',
      logo: true,
      link: 'https://linkedin.com'
    });
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should receive singleperson input properly', () => {
    expect(component.singleperson().name).toBe('Marco E.');
  });
});
