import { Component, OnInit, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { TranslateModule } from '@ngx-translate/core';
import { ValidationService } from '../../shared/service/validation-service';
import { ToastMsgService } from '../../shared/service/tms-service';
import { ToastComponent } from "../../shared/toast/toast.component";

// #region Interface

interface MailPayload {
  name: string;
  email: string;
  message: string;
}

interface MailResponse {
  status: 'success' | 'error';
  message?: string;
}

// #endregion

@Component({
  selector: 'app-contact-me',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule, ToastComponent],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss'
})
export class ContactMeComponent implements OnInit {

// #region Attributes

/**
 * Form value for the user's name.
 * @type {string}
 */
name: string = '';

/**
 * Form value for the user's email address.
 * @type {string}
 */
email: string = '';

/**
 * Form value for the user's message.
 * @type {string}
 */
message: string = '';

/**
 * Indicates whether the privacy policy has been accepted.
 * @type {boolean}
 */
isPrivacyAccepted: boolean = false;

// Validierungs-Flags
/**
 * Validation flag for the 'name' field. True if valid.
 * @type {boolean}
 */
nameValid: boolean = false;

/**
 * Validation flag for the 'email' field. True if valid.
 * @type {boolean}
 */
emailValid: boolean = false;

/**
 * Validation flag for the 'message' field. True if valid.
 * @type {boolean}
 */
messageValid: boolean = false;

// Touch-Flags
/**
 * Touch flag for the 'name' field. True if the field has been interacted with.
 * @type {boolean}
 */
nameTouched: boolean = false;

/**
 * Touch flag for the 'email' field. True if the field has been interacted with.
 * @type {boolean}
 */
emailTouched: boolean = false;

/**
 * Touch flag for the 'message' field. True if the field has been interacted with.
 * @type {boolean}
 */
messageTouched: boolean = false;

// Services via inject()
/**
 * Service for handling field validation logic.
 * @private
 * @type {ValidationService}
 */
private validationService = inject(ValidationService);

/**
 * Service for displaying toast messages/notifications.
 * @private
 * @type {ToastMsgService}
 */
private toastMsgService = inject(ToastMsgService);

/**
 * Angular's HttpClient for making HTTP requests.
 * @private
 * @type {HttpClient}
 */
private http = inject(HttpClient);

/**
 * The API endpoint URL for form submission (mailing service).
 * @private
 * @type {string}
 */
private apiUrl = 'https://marcus-guehne.com/mailing.php';

private MAX_ROTATE = 10; // Etwas weniger Rotation für Formulare wirkt oft edler
  public target = { rx: 0, ry: 0, mx: 50, my: 50 };
  public current = { rx: 0, ry: 0, mx: 50, my: 50 };

// #endregion

// #region Validation

/**
 * Lifecycle hook that is called after data-bound properties are initialized.
 * Loads input from session storage and performs initial validation.
 * @returns {void}
 */
ngOnInit(): void {
  this.loadInputFromSessionStorage();
  this.validateFields();
  this.animate();
}

private lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  private animate() {
    this.current.mx = this.lerp(this.current.mx, this.target.mx, 0.12);
    this.current.my = this.lerp(this.current.my, this.target.my, 0.12);

    requestAnimationFrame(() => this.animate());
  }

  onMouseMove(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();

    this.target.mx = ((e.clientX - rect.left) / rect.width) * 100;
    this.target.my = ((e.clientY - rect.top) / rect.height) * 100;

  }

  onMouseLeave() {
    this.target.mx = 50;
    this.target.my = 50;
  }

/**
 * Validates all form fields and saves the current input to session storage.
 * @returns {void}
 */
validateFields(): void {
  this.nameValid = this.validationService.isTextValid(this.name);
  this.emailValid = this.validationService.isEmailValid(this.email);
  this.messageValid = this.validationService.isTextValid(this.message);
  this.saveInput();
}

/**
 * Checks the overall validity of the form, combining field validation and privacy acceptance.
 * @returns {boolean} True if the form is completely valid for submission.
 */
isFormValid(): boolean {
  return this.nameValid && this.emailValid && this.messageValid && this.isPrivacyAccepted;
}

/**
 * Resets the form properties and clears the associated session storage data.
 * Also triggers a re-validation and resets touch flags.
 * @private
 * @returns {void}
 */
private resetFormState(): void {
  this.name = '';
  this.email = '';
  this.message = '';
  this.isPrivacyAccepted = false;
  sessionStorage.clear();
  this.validateFields();
  this.nameTouched = false;
  this.emailTouched = false;
  this.messageTouched = false;
}

// #endregion

// #region handleSubmission

/**
 * Handles error responses (Status 4xx or 5xx) from the HTTP client.
 * Displays a descriptive error message via the toast service.
 * @private
 * @param {HttpErrorResponse} error The HTTP error response object.
 * @returns {void}
 */
private handleSubmissionError(error: HttpErrorResponse): void {
    let errorMessage = `Server error (Status ${error.status}).`;

    if (error.error instanceof ErrorEvent) {
        errorMessage = `Network error: ${error.error.message}`;
    } else if (error.error && typeof error.error === 'object' && 'message' in error.error) {
        errorMessage = error.error.message as string;
    }
    this.toastMsgService.add(`Submission failed: ${errorMessage}`, 4000, 'error');
}

/**
 * Handles successful responses (Status 200) from the server.
 * Displays a success or detailed error toast message and resets the form on successful mail delivery.
 * @private
 * @param {MailResponse} response The successful HTTP response body containing mail status.
 * @returns {void}
 */
private handleSubmissionNext(response: MailResponse): void {
    if (response.status === 'success') {
        this.toastMsgService.add('ship successfully', 4000, 'success');
        this.resetFormState();
    } else {
        this.toastMsgService.add('ship missed ' + (response.message || 'Server error.'), 4000, 'error');
    }
}

// #endregion

// #region Form submission

/**
 * Processes the form submission logic.
 * Marks all fields as touched, validates the form, and submits the data via HTTP if valid.
 * Displays an error toast if the form is invalid.
 * @returns {void}
 */
onSubmit(): void {
  this.nameTouched = true;
  this.emailTouched = true;
  this.messageTouched = true;
  this.validateFields();

  if (!this.isFormValid()) {
    this.toastMsgService.add('Please correctly fill in all required fields.', 4000, 'error');
    return;
  }
  
  const payload: MailPayload = { name: this.name, email: this.email, message: this.message };

  this.http.post<MailResponse>(this.apiUrl, payload).subscribe({
    next: (response) => this.handleSubmissionNext(response),
    error: (error: HttpErrorResponse) => this.handleSubmissionError(error)
  });
}

// #endregion

// #region SESSION STORAGE

/**
 * Saves the current form input values to Session Storage under 'contactForm' and 'privacyPolicyChecked'.
 * @returns {void}
 */
saveInput(): void {
  const dataToSave = { name: this.name, email: this.email, message: this.message };
  sessionStorage.setItem('contactForm', JSON.stringify(dataToSave));
  sessionStorage.setItem('privacyPolicyChecked', JSON.stringify(this.isPrivacyAccepted));
}

/**
 * Loads and restores saved form input values and privacy acceptance state from Session Storage.
 * @returns {void}
 */
loadInputFromSessionStorage(): void {
  const savedData = sessionStorage.getItem('contactForm');
  const savedPrivacy = sessionStorage.getItem('privacyPolicyChecked');

  if (savedData) {
    const data = JSON.parse(savedData);
    this.name = data.name || '';
    this.email = data.email || '';
    this.message = data.message || '';
  }

  if (savedPrivacy) {
    this.isPrivacyAccepted = JSON.parse(savedPrivacy);
  }
}

/**
 * Sets the touched flag for a specific form field.
 * Used to conditionally display validation messages after user interaction.
 * @param {'name' | 'email' | 'message'} field The name of the field to mark as touched.
 * @returns {void}
 */
markAsTouched(field: 'name' | 'email' | 'message'): void {
  if (field === 'name') {
    this.nameTouched = true;
  } else if (field === 'email') {
    this.emailTouched = true;
  } else if (field === 'message') {
    this.messageTouched = true;
  }
}

// #endregion
}