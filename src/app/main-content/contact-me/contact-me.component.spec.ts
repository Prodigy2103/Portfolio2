import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactMeComponent } from './contact-me.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ContactMeComponent', () => {
  let component: ContactMeComponent;
  let fixture: ComponentFixture<ContactMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactMeComponent, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form signals properly', () => {
    expect(component.isFormValid()).toBeFalse();
    component.name.set('Marcus');
    component.email.set('test@example.com');
    component.message.set('Hello World');
    component.isPrivacyAccepted.set(true);
    expect(component.isFormValid()).toBeTrue();
  });
});
