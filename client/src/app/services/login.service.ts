import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/login', {email, password});
  }
}

export class User {
  fullName!: string;
  address!: string;
  dateOfBirth!: string;
  phoneNumber!: string;
  email!: string;
  password!: string;
  fkUserType!: number;
  registrationDate!: Date;
  lastLoginDate!: Date;
  active!: number;
  approved!: number;
  registrationNumber!: string;
}


