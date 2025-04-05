import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterService } from './register.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService]
    });
    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send registration data to the API', () => {
    const mockUserData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123',
      dob: '1990-01-01',
      phone: '1234567890',
      address: '123 Test St',
      security_question: "What was your first pet's name?",
      security_answer: 'Fluffy',
      role: 'employee'
    };

    const mockResponse = {
      message: 'User registered successfully!',
      data: {
        id: 1,
        ...mockUserData
      }
    };

    service.registerUser(mockUserData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush(mockResponse);
  });

  it('should handle registration errors', () => {
    const mockUserData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123',
      // Missing required fields
    };

    const mockErrorResponse = {
      email: ['This field is required.']
    };

    service.registerUser(mockUserData).subscribe({
      error: (error) => {
        expect(error.message).toContain('This field is required');
      }
    });

    const req = httpMock.expectOne('http://localhost:8000/register');
    req.flush(mockErrorResponse, { 
      status: 400, 
      statusText: 'Bad Request' 
    });
  });

  it('should handle network errors', () => {
    const mockUserData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123',
      dob: '1990-01-01',
      phone: '1234567890',
      address: '123 Test St',
      security_question: "What was your first pet's name?",
      security_answer: 'Fluffy',
      role: 'employee'
    };

    service.registerUser(mockUserData).subscribe({
      error: (error) => {
        expect(error.message).toContain('An unknown error occurred');
      }
    });

    const req = httpMock.expectOne('http://localhost:8000/register');
    req.error(new ProgressEvent('network error'), {
      status: 0,
      statusText: 'Network Error'
    });
  });
});