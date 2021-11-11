import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/users/current');
  }

  getDoctors(): Observable<User[]> {
    return this.http.get<User[]>('api/users/doctors');
  }
}
