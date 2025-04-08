import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { 
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonAlert,
  IonSpinner,
  IonNote
} from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    IonAlert,
    IonSpinner,
    IonNote
  ]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private loginService = inject(LoginService);
  private alertController = inject(AlertController);

  loginForm: FormGroup;
  isSubmitting = false;
  showErrorAlert = false;
  errorMessage = '';
  showSuccessToast = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    
    try {
      const response: any = await this.loginService.login(
        this.loginForm.value.email,
        this.loginForm.value.password
      ).toPromise();

      if (response.status === 'success') {
        // Store user data in session
        sessionStorage.setItem('currentUser', JSON.stringify(response.user));
        
        // Show success alert
        await this.showSuccessAlert();
      } else {
        this.errorMessage = response.error || 'Login failed';
        this.showErrorAlert = true;
      }
    } catch (error: any) {
      this.errorMessage = error.error?.error || 'Login failed. Please try again.';
      this.showErrorAlert = true;
    } finally {
      this.isSubmitting = false;
    }
  }

  private async showSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Login successful!',
      buttons: ['OK']
    });
    await alert.present();
    
    // Navigate after alert is dismissed
    const { role } = await alert.onDidDismiss();
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    window.location.href = user.role === 'company' ? '/comp-home' : '/emp-home';
  }

  private markAllAsTouched() {
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  dismissAlert() {
    this.showErrorAlert = false;
  }
}