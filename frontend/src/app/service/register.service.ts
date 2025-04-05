import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8000/register/';

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<{ success: boolean, message: string, uid?: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Format date to YYYY-MM-DD
    const formattedData = {
      ...userData,
      dob: this.formatDate(userData.dob)
    };

    return this.http.post<any>(this.apiUrl, formattedData, { headers }).pipe(
    //   catchError(this.handleError)
    // );
      //Pop Up message
      map(response => ({
        success: true,
        message: 'Registration successful!',
        uid: response.uid
      })),
      catchError(this.handleError)
    );
  }

  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
        errorMessage = `Client error: ${error.error.message}`;
    } else {
        if (error.status === 400 && error.error) {
            if (error.error.error) {
                errorMessage = error.error.error;
            } else if (typeof error.error === 'object') {
                errorMessage = this.parseDjangoErrors(error.error);
            } else {
                errorMessage = 'Invalid request data';
            }
        } else if (error.status >= 500) {
            errorMessage = 'Server error occurred. Please try again later.';
        }
    }
    return throwError(() => new Error(errorMessage));
}

  private parseDjangoErrors(errors: any): string {
    const firstErrorKey = Object.keys(errors)[0];
    const firstError = errors[firstErrorKey];
    if (Array.isArray(firstError)) {
      return `${firstErrorKey}: ${firstError[0]}`;
    }
    return firstError;
  }
}