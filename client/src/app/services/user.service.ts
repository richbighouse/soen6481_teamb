import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'shared/models/models';
import { EditProfileRequest } from 'shared/models/models';


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

  updateUser(editProfileRequest: EditProfileRequest): Observable<EditProfileRequest> {
    return this.http.put<EditProfileRequest>('/api/users/editprofile', editProfileRequest);
  }

}
