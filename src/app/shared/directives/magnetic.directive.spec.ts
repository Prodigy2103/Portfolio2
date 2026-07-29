import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagneticDirective } from './magnetic.directive';

@Component({
  standalone: true,
  imports: [MagneticDirective],
  template: `<button appMagnetic [magneticStrength]="0.4">Test Button</button>`
})
class TestHostComponent {}

describe('MagneticDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create host component with directive', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
