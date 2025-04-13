import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonAlert,
  IonSpinner,
  IonSelect,
  IonSelectOption,
  IonText,
  IonNote,
  IonIcon,
  AlertController
} from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../service/register.service';
import { HttpErrorResponse } from '@angular/common/http';
// DOB
import { addIcons } from 'ionicons';
import { calendar } from 'ionicons/icons';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonButtons,
    IonItem,
    IonLabel,
    IonRadioGroup,
    IonRadio,
    IonDatetimeButton,
    IonModal,
    IonDatetime,
    IonAlert,
    IonSpinner,
    IonSelect,
    IonSelectOption,
    IonText,
    IonNote,
    IonIcon
  ],
  providers: [AlertController]
})


export class RegisterComponent {
  private fb = inject(FormBuilder);
  private registerService = inject(RegisterService);
  private router = inject(Router);
  private alertController = inject(AlertController); //Pop Up msg

  registerForm: FormGroup;
  isSubmitting = false;
  showErrorAlert = false;
  errorMessage = '';
  isDatePickerOpen = false; 
  maxDate = new Date().toISOString().split('T')[0];
  highlightedDates = [];

  // Security Question
  securityQuestions = [
    "What was your first pet's name?",
    "What city were you born in?",
    "What is your mother's maiden name?",
    "What was the name of your first school?"
  ];

  constructor() {
    addIcons({ calendar });
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dob: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      address: ['', Validators.required],
      security_question: ['', Validators.required],
      security_answer: ['', Validators.required],
      role: ['employee', Validators.required]
    });
  }

  // Date picker methods
  openDatePicker() {
    this.isDatePickerOpen = true;
  }

  closeDatePicker() {
    this.isDatePickerOpen = false;
  }

  dateSelected(event: any) {
    if (event.detail.value) {
      const selectedDate = new Date(event.detail.value);
      if (!isNaN(selectedDate.getTime())) {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        this.registerForm.get('dob')?.setValue(formattedDate);
      }
    }
    this.closeDatePicker();
  }

  getDisplayDate(): string {
    const dobValue = this.registerForm.get('dob')?.value;
    if (!dobValue) return '';
    
    try {
      const date = new Date(dobValue);
      if (isNaN(date.getTime())) return dobValue;
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch {
      return dobValue;
    }
  }

  // Register submit button
  async onSubmit() {
    if (this.registerForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formData = this.registerForm.value;

    this.registerService.registerUser(formData).subscribe({
      next: async (response) => {
        this.isSubmitting = false;
        await this.showSuccessAlert(response.uid);
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting = false;
        this.errorMessage = error.error?.error || error.message;
        this.showErrorAlert = true;
      }
    });
  }

  private async showSuccessAlert(uid?: string) {
    const alert = await this.alertController.create({
      header: 'Registration Successful!',
      message: uid 
        ? `Your account has been created successfully!`
        : 'Back to Login.....',
      buttons: [
        {
          text: 'Continue to Login',
          handler: () => {
            this.router.navigate(['/login'], {
              queryParams: { registered: 'true' }
            });
          }
        }
      ],
      cssClass: 'success-alert'
    });
  
    await alert.present();
  }

  private markAllAsTouched() {
    Object.values(this.registerForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  private handleRegistrationError(error: HttpErrorResponse) {
    if (error.status === 400 && error.error) {
      if (error.error.email) {
        this.errorMessage = error.error.email[0];
      } else if (error.error.non_field_errors) {
        this.errorMessage = error.error.non_field_errors[0];
      } else {
        this.errorMessage = 'Please check your registration details.';
      }
    } else {
      this.errorMessage = 'Registration failed. Please try again later.';
    }
    this.showErrorAlert = true;
  }

  dismissAlert() {
    this.showErrorAlert = false;
  }
}