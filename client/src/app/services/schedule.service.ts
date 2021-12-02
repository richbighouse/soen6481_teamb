import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleEvent } from 'shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) { }

  getSchedule(userId: number): Observable<ScheduleEvent[]> {
    return this.http.get<ScheduleEvent[]>(`/api/schedule/${userId}`);
  }

  postAppoitment(location: string, startDateTime: string, endDateTime: string, fkPatientId: number, fkProfessionalId: number): Observable<any> {
    return this.http.post<any>(`/api/schedule`, {
      location: location,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      fkPatientId: fkPatientId,
      fkProfessionalId: fkProfessionalId
    })
  }

  cancelAppointment(appointmentId: number) {
    return this.http.delete(`/api/schedule/${appointmentId}`);
  }
  cancelAppointmentByPatientID(patientId: number) {
    console.log(patientId);
    return this.http.delete(`/api/appointment/${patientId}`);
  }  

  postAssessmentStatus(assessmentId: number): Observable<any> {
    console.log(assessmentId);
    return this.http.post('/api/self-assessment-test/status', {assessmentId});
  }  
}
