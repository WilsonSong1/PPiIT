import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';

import { appRoutes } from './app/app.routes'; // Ensure this file exists and is correctly named
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideIonicAngular(), // Ensures Ionic components work properly
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Correct Route Strategy
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
  ],
}).catch(err => console.error(err));
