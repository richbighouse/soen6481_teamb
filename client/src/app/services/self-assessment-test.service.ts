import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SelfAssessmentTest } from 'shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class SelfAssessmentTestService {

  constructor(private http: HttpClient) { }

  postSelfAssessmentTest(selfAssessmentTest: SelfAssessmentTest): Observable<SelfAssessmentTest> {
    return this.http.post<SelfAssessmentTest>('/api/self-assessment-test', selfAssessmentTest);
  }
}
