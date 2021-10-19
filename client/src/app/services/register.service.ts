import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

    register(registrationRequest: RegistrationRequest): Observable<any> {
      return this.http.post('/api/register', {registrationRequest});
    }
}

export class RegistrationRequest {
  email: string;
  password: string;
  address: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  registrationNumber: string;
  userType: string;

  constructor(email: string, password: string, address: string, fullName: string, dateOfBirth: string, phoneNumber: string, registrationNumber: string, userType: string) {
    this.email = email;
    this.fullName = fullName;
    this.password = password;
    this.address = address;
    this.dateOfBirth = dateOfBirth;
    this.phoneNumber = phoneNumber;
    this.registrationNumber = registrationNumber;
    this.userType = userType;
  }
}