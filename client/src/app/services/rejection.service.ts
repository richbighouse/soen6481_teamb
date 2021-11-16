import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { SelfAssessmentForTable } from 'shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class RejectionService {

  constructor(private http: HttpClient) { }

  postRejectStatus(selfAssessmentForTable: SelfAssessmentForTable): Observable<any> {
    return this.http.post('/api/patients/reject', {selfAssessmentForTable});
  }
}
