import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
    ) { }

    login(username: string, password: string): Observable<any> {
      return this.http.post('/api/login', {username, password}) 
    }

    register(username: string, email: string, password: string): Observable<any> {
      return this.http.post('/api/register', {
        username,
        email,
        password
      });
    }
}



