import { Component, OnInit } from '@angular/core';
import { AssessmentStatus, User } from 'shared/models/models';
import { SelfAssessmentTestService } from 'src/app/services/self-assessment-test.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-test-status',
  templateUrl: './view-test-status.component.html',
  styleUrls: ['./view-test-status.component.css']
})
export class ViewTestStatusComponent implements OnInit {

  currentUser!: User;
  assessmentStatus!: AssessmentStatus;

  constructor(
     private selfAssessmentService: SelfAssessmentTestService,
     private userService: UserService,) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe
    (res => {
      this.currentUser = res;
      this.selfAssessmentService.getTestStatus(this.currentUser.id)
      .subscribe(
        res => this.assessmentStatus = res
      )
    },
    err => {
      console.log(err);
    })
  }

}
