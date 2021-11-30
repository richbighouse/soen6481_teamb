import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentStatus, User } from 'shared/models/models';
import { SelfAssessmentTestService } from 'src/app/services/self-assessment-test.service';

@Component({
  selector: 'app-view-test-status',
  templateUrl: './view-test-status.component.html',
  styleUrls: ['./view-test-status.component.css']
})
export class ViewTestStatusComponent implements OnInit {
  displayedColumns: string[] = ['assessmentId', 'assessmentDate', 'status', 'professional', 'date', 'location'];
  assessmentStatus!: AssessmentStatus[];
  status!: string;
  isLoading = true;

  constructor(
     private selfAssessmentService: SelfAssessmentTestService,
     private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe(
      params => {
        const patientId = parseInt(params.get('patientId')!);
        this.selfAssessmentService.getTestStatus(patientId)
        .subscribe(
          res => {
            console.log(res)
            this.assessmentStatus = res;
            this.isLoading = false;
          }
          )
        },
        err => {
        console.log(err);
       })
  }

  getStatus() {
    const test = this.assessmentStatus[0];
    if (test.rejected) {
      this.status = 'rejected';
      return 'No action required'
    }
    if (test.viewedByNurse === 0) {
      this.status = 'pending';
      return 'Pending review'
    }
    if (test.appointmentTime) {
      this.status = 'booked';
      return `Appointment scheduled`
    }
    if (test.assignedDoctorId) {
      this.status = 'assigned';
      return `Assigned to doctor for review`
    } else {
      return 'N/A'
    }
  }

  getProfessional() {
    const test = this.assessmentStatus[0];
    if (test.appointmentTime) {
      return test.appointmentProfessionalFullName;
    } else if (test.assignedDoctorId) {
      return test.doctorFullName
    }
    return test.doctorFullName ? test.doctorFullName : '-'
  }

  getLocation() {
    const test = this.assessmentStatus[0];
    return test.location ? test.location : '-'
  }

  getDate() {
    const test = this.assessmentStatus[0];
    return test.appointmentTime ? test.appointmentTime : '-'
  }
}
