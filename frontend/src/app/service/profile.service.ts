// src/app/service/profile.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8000/api'; // Your Django API endpoint
  private currentProfile = new BehaviorSubject<any>(null);
  
  currentProfile$ = this.currentProfile.asObservable();

  constructor(private http: HttpClient) {}

  fetchProfile(uid: string) {
    return this.http.get(`${this.apiUrl}/get_profile/?uid=${uid}`).subscribe({
      next: (profile) => {
        this.currentProfile.next(profile);
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  }
}