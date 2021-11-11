import { Component, OnInit, ViewChild } from '@angular/core';
import { SelfAssessmentForTable, SelfAssessmentTest, User } from 'shared/models/models';
import { SelfAssessmentTestService } from 'src/app/services/self-assessment-test.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { UserService } from 'src/app/services/user.service';
import { SelfAssessmentComponent } from '../self-assessment/self-assessment.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogChooseDoctorComponent } from './dialog-choose-doctor/dialog-choose-doctor.component';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  @ViewChild(MatTable) table!: MatTable<SelfAssessmentForTable>;

  displayedColumns: string[] = ['id', 'patient-name', 'patient-id', 'date'];
  dataSource!: SelfAssessmentForTable[];

  dataSourceInner!: SelfAssessmentForTable;
  displayedColumnsInner: string[] = ['question', 'answer'];
  expandedElement!: SelfAssessmentForTable | null;
  doctors: User[] = [];

  constructor(
    private selfAssessmentTestService: SelfAssessmentTestService,
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.selfAssessmentTestService.getUnviewedTests()
    .subscribe(res => {
      this.dataSource = res;
    },
    err => {
      console.log(err)
    })
    this.userService.getDoctors()
    .subscribe(res => 
      this.doctors = res,
      err => console.log(err)
    )
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

  rejectClicked(test: SelfAssessmentTest) {
    console.log('clicked!');
  }

  referToDoctorClicked(test: SelfAssessmentForTable) {
    const dialogRef = this.dialog.open(DialogChooseDoctorComponent, {
      data: {
        doctors: this.doctors
      },
    });

    dialogRef.afterClosed().subscribe(res => {
      this.selfAssessmentTestService.assignToDoctor(test, res.doctor)
      .subscribe(res => {

        this.snackBar.open(
          'Patient succesfully assigned to Doctor.', 'Dismiss', { duration: 10000});

        for (let i = 0; i < this.dataSource.length; i++) {
          if(this.dataSource[i].testId === test.testId) {
            this.dataSource.splice(i, 1);    
        }
        this.table.renderRows();
      }})});
  }
}
