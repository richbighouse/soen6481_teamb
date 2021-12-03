import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from 'shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  getReport(baseDate: string): Observable<any> {
    return this.http.get<any>(`/api/reports/${baseDate}`);
  }
}
