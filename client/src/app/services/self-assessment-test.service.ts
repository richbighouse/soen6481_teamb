import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SelfAssessmentTest, SelfAssessmentForTable, User } from 'shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class SelfAssessmentTestService {

  constructor(private http: HttpClient) { }

  postSelfAssessmentTest(selfAssessmentTest: SelfAssessmentTest): Observable<SelfAssessmentTest> {
    return this.http.post<SelfAssessmentTest>('/api/self-assessment-test', selfAssessmentTest);
  }

  getUnviewedTests(): Observable<SelfAssessmentForTable[]> {
    return this.http.get<SelfAssessmentForTable[]>('/api/self-assessment-test/unviewed')
  }

  getTestsForDoctor(doctorId: number): Observable<SelfAssessmentForTable[]> {
    console.log(`getTestsForDoctor ${doctorId}`)
    return this.http.get<SelfAssessmentForTable[]>(`/api/self-assessment-test/doctor/${doctorId}`)
  }

  assignToDoctor(assessment: SelfAssessmentForTable, doctor: User): Observable<any> {
    return this.http.post('/api/self-assessment-test/assign', {assessment, doctor})
  }
 }
