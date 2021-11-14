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
}
