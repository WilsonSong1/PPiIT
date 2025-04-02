import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
// Import your components
import { HeaderComponent } from './header/header.component'; // Import HeaderComponent
import { HomeComponent } from './employee/home/home.component';
import { JobseekComponent } from './employee/jobseek/jobseek.component';
import { CreatecvComponent } from './employee/createcv/createcv.component';
import { ProfileComponent } from './employee/profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Import Angular Modules
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'; // Add this import

// Import services
import { RegisterService } from './service/register.service';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, // Add HeaderComponent
    HomeComponent,
    JobseekComponent,
    CreatecvComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    // AppRoutingModule],
    RouterModule.forRoot(appRoutes),
    FormsModule, // Add FormsModule
    ReactiveFormsModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allow Web Components like <ion-button>
  providers: [RegisterService, provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule {}
