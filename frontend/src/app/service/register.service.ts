import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'http://localhost:8000/api'; // Django backend

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
