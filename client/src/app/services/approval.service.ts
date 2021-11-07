import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  constructor(private http: HttpClient) { }



  postApproveStatus(user: User): Observable<any> {
    return this.http.post('/api/users/approve', {user});
  }

  postRejectStatus(user: User): Observable<any> {
    return this.http.post('/api/users/reject', {user});
  }

  getUnApprovedUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users/unapproved')
  }
 }
