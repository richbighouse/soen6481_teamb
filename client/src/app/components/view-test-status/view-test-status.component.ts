import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentStatus } from 'shared/models/models';
import { SelfAssessmentTestService } from 'src/app/services/self-assessment-test.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { MatTable } from '@angular/material/table';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-view-test-status',
  templateUrl: './view-test-status.component.html',
  styleUrls: ['./view-test-status.component.css']
})
export class ViewTestStatusComponent implements OnInit {
  displayedColumns: string[] = ['assessmentId', 'assessmentDate', 'status', 'professional', 'date', 'location', 'actions'];
  assessmentStatus!: AssessmentStatus[];
  status!: string;
  isLoading = true;
  @ViewChild(MatTable) table!: MatTable<AssessmentStatus>;  
  

  constructor(
     private selfAssessmentService: SelfAssessmentTestService,
     private activatedRoute: ActivatedRoute,
     public dialog: MatDialog,
     private scheduleService:ScheduleService) { }

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
  cancelAppointment(assessmentStatus: AssessmentStatus) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        question: 'Do you really want to cancel this appointment?'
      },
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.isConfirm === true) {
    this.scheduleService.cancelAppointmentByPatientID(assessmentStatus.patientId).subscribe(
      response => {
        console.log("done")     
      }
    ) 
    this.scheduleService.postAssessmentStatus(assessmentStatus.assessmentId).subscribe(
      response => {
        console.log("done")    
      }  
    ) 	
        this.refreshRows(assessmentStatus);
      }
    })
  };
  
    

  refreshRows(assessmentStatus: AssessmentStatus)
  {
    for (let i = 0; i < this.assessmentStatus.length; i++) 
    {
      if(this.assessmentStatus[i].assessmentId == assessmentStatus.assessmentId) {
        console.log(this.assessmentStatus[i].assessmentId)
        this.assessmentStatus.splice(i, 1);
      }
    }
    this.table.renderRows();
  }
}
