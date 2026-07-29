import { Component, OnInit, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { TranslateModule } from '@ngx-translate/core';
import { ValidationService } from '../../shared/service/validation-service';
import { ToastMsgService } from '../../shared/service/tms-service';
import { ToastComponent } from "../../shared/toast/toast.component";

export interface MailPayload {
  name: string;
  email: string;
  message: string;
}

export interface MailResponse {
  status: 'success' | 'error';
  message?: string;
}

@Component({
  selector: 'app-contact-me',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, FormsModule, CommonModule, ToastComponent],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent implements OnInit {
  private readonly validationService = inject(ValidationService);
  private readonly toastMsgService = inject(ToastMsgService);
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://marcus-guehne.com/mailing.php';

  public readonly name = signal('');
  public readonly email = signal('');
  public readonly message = signal('');
  public readonly isPrivacyAccepted = signal(false);

  public readonly nameTouched = signal(false);
  public readonly emailTouched = signal(false);
  public readonly messageTouched = signal(false);

  public readonly current = signal({ mx: 50, my: 50 });

  public readonly nameValid = computed(() => this.validationService.isTextValid(this.name()));
  public readonly emailValid = computed(() => this.validationService.isEmailValid(this.email()));
  public readonly messageValid = computed(() => this.validationService.isTextValid(this.message()));

  public readonly isFormValid = computed(() => {
    return this.nameValid() && this.emailValid() && this.messageValid() && this.isPrivacyAccepted();
  });

  ngOnInit(): void {
    this.loadInputFromSessionStorage();
  }

  public onMouseMove(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    this.current.set({ mx, my });
  }

  public onMouseLeave(): void {
    this.current.set({ mx: 50, my: 50 });
  }

  public markAsTouched(field: 'name' | 'email' | 'message'): void {
    if (field === 'name') this.nameTouched.set(true);
    if (field === 'email') this.emailTouched.set(true);
    if (field === 'message') this.messageTouched.set(true);
  }

  public onFieldChange(): void {
    this.saveInput();
  }

  public onSubmit(): void {
    this.nameTouched.set(true);
    this.emailTouched.set(true);
    this.messageTouched.set(true);

    if (!this.isFormValid()) {
      this.toastMsgService.add('Please correctly fill in all required fields.', 4000, 'error');
      return;
    }
    this.sendMailPayload();
  }

  private sendMailPayload(): void {
    const payload: MailPayload = { name: this.name(), email: this.email(), message: this.message() };
    this.http.post<MailResponse>(this.apiUrl, payload).subscribe({
      next: (res) => this.handleSuccess(res),
      error: (err: HttpErrorResponse) => this.handleError(err)
    });
  }

  private handleSuccess(res: MailResponse): void {
    if (res.status === 'success') {
      this.toastMsgService.add('ship successfully', 4000, 'success');
      this.resetFormState();
    } else {
      this.toastMsgService.add('ship missed ' + (res.message || 'Server error.'), 4000, 'error');
    }
  }

  private handleError(err: HttpErrorResponse): void {
    const msg = err.error?.message || `Server error (${err.status})`;
    this.toastMsgService.add(`Submission failed: ${msg}`, 4000, 'error');
  }

  private resetFormState(): void {
    this.name.set('');
    this.email.set('');
    this.message.set('');
    this.isPrivacyAccepted.set(false);
    this.nameTouched.set(false);
    this.emailTouched.set(false);
    this.messageTouched.set(false);
    sessionStorage.clear();
  }

  private saveInput(): void {
    const data = { name: this.name(), email: this.email(), message: this.message() };
    sessionStorage.setItem('contactForm', JSON.stringify(data));
    sessionStorage.setItem('privacyPolicyChecked', JSON.stringify(this.isPrivacyAccepted()));
  }

  private loadInputFromSessionStorage(): void {
    const savedData = sessionStorage.getItem('contactForm');
    const savedPrivacy = sessionStorage.getItem('privacyPolicyChecked');
    if (savedData) {
      const data = JSON.parse(savedData);
      this.name.set(data.name || '');
      this.email.set(data.email || '');
      this.message.set(data.message || '');
    }
    if (savedPrivacy) {
      this.isPrivacyAccepted.set(JSON.parse(savedPrivacy));
    }
  }
}