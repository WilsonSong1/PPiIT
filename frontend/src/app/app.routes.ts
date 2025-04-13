import { Routes } from '@angular/router';
import { HomeComponent } from './employee/home/home.component';
import { JobseekComponent } from './employee/jobseek/jobseek.component';
import { CreatecvComponent } from './employee/createcv/createcv.component';
import { ProfileComponent } from './employee/profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'jobseek', component: JobseekComponent },
  { path: 'createcv', component: CreatecvComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];