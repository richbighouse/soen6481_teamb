import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentStatus, User } from 'shared/models/models';
import { SelfAssessmentTestService } from 'src/app/services/self-assessment-test.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-test-status',
  templateUrl: './view-test-status.component.html',
  styleUrls: ['./view-test-status.component.css']
})
export class ViewTestStatusComponent implements OnInit {
  displayedColumns: string[] = ['assessmentId', 'assessmentDate', 'status', 'professional', 'date', 'location'];
  patientId!: number;
  assessmentStatus!: AssessmentStatus[];
  isLoading: boolean = true;

  constructor(
     private selfAssessmentService: SelfAssessmentTestService,
     private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        console.log(params.get('patientId'))
        this.patientId = parseInt(params.get('patientId')!);
        this.selfAssessmentService.getTestStatus(this.patientId)
        .subscribe(
          res => {
            this.assessmentStatus = res
            this.isLoading = false;
          })
        },
        err => {
        console.log(err);
       })
  }
}


