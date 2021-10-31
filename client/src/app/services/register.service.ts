import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RegistrationRequest } from 'shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

    register(registrationRequest: RegistrationRequest): Observable<any> {
      return this.http.post('/api/register', {registrationRequest});
    }
}