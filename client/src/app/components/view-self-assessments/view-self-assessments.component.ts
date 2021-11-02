import { Component, OnInit } from '@angular/core';
import { SelfAssessmentForTable } from 'shared/models/models';
import { SelfAssessmentTestService } from 'src/app/services/self-assessment-test.service';

@Component({
  selector: 'app-view-self-assessments',
  templateUrl: './view-self-assessments.component.html',
  styleUrls: ['./view-self-assessments.component.css']
})
export class ViewSelfAssessmentsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'patient-name', 'patient-id', 'date', 'actions'];
  dataSource!: SelfAssessmentForTable[];

  constructor(
    private selfAssessmentTestSerive: SelfAssessmentTestService
  ) { }

  ngOnInit(): void {
    this.selfAssessmentTestSerive.getUnviewedTests()
    .subscribe(res => {
      this.dataSource = res;
    },
    err => {
      console.log(err)
    })
  }

}
