import { Component, OnInit } from '@angular/core';
import { SelfAssessmentForTable } from 'shared/models/models';
import { SelfAssessmentTestService } from 'src/app/services/self-assessment-test.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-view-self-assessments',
  templateUrl: './view-self-assessments.component.html',
  styleUrls: ['./view-self-assessments.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewSelfAssessmentsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'patient-name', 'patient-id', 'date', 'actions'];
  dataSource!: SelfAssessmentForTable[];

  dataSourceInner!: SelfAssessmentForTable;
  displayedColumnsInner: string[] = ['question', 'answer'];
  expandedElement!: SelfAssessmentForTable | null;

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

  yesOrNo(value: boolean): string {
    if (value === null) {
      return 'N/A';
    }
    return value === true ? 'Yes' : 'No';
  }

  ageRange(value: string): string {
    if (value === '5') {
      return '6 months - 5 years';
    }
    if (value === '6-17') {
      return '6-17 years';
    }
    if (value === '18+') {
      return '18 years+'
    } else {
      return 'N/A'
    }
  }
}
