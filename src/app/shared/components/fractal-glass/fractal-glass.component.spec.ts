import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FractalGlassComponent } from './fractal-glass.component';

describe('FractalGlassComponent', () => {
  let component: FractalGlassComponent;
  let fixture: ComponentFixture<FractalGlassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FractalGlassComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FractalGlassComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('src', 'assets/ProjectsImg/LOGO_NEW.png');
    fixture.detectChanges();
  });

  it('should create the fractal glass component', () => {
    expect(component).toBeTruthy();
  });

  it('should compute resolved height and border-radius correctly', () => {
    fixture.componentRef.setInput('height', 320);
    fixture.componentRef.setInput('borderRadius', 12);
    fixture.detectChanges();

    expect(component.resolvedHeight()).toBe('320px');
    expect(component.resolvedBorderRadius()).toBe('12px');
  });

  it('should normalize settings from inputs', () => {
    fixture.componentRef.setInput('stripes', 30);
    fixture.componentRef.setInput('distortion', 20);
    fixture.detectChanges();

    const settings = component.currentSettings();
    expect(settings.stripes).toBe(30);
    expect(settings.distortion).toBe(20);
  });
});

