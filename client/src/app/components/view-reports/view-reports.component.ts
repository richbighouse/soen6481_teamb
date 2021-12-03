import { Component, OnInit } from '@angular/core';
import { Report } from 'shared/models/models';
import { ReportsService } from 'src/app/services/reports.service';
import { ChartType} from 'angular-google-charts'
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ViewReportsComponent implements OnInit {


  baseDate = new FormControl(moment());

  isLoading: boolean = true;

  // chart
  type = ChartType.BarChart;
  data: any[] = [];
  dynamicResize = true;
  title: string = 'Self-Assessments taken per period'
  columnNames = ['', 'Tests'];
  options = {
    hAxis: {
      title: 'Total Self-Assessments taken over the period',
      minValue: 0
    },
    vAxis: {
      title: 'Time Period'
    },
    colors: ['#3F51B5']
  }

  constructor(
    private reportsService: ReportsService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    var now = new Date();
    this.getReport(moment(now).format('YYYY-MM-DD'));
  }

  getReport(date: string) {
    this.isLoading = true;
    this.reportsService.getReport(date).subscribe(res => {
      this.data = [
        [`${date}`, parseInt(res[0].daily)],
        ['Previous 7 Days', res[0].weekly],
        ['Previous 30 Days', res[0].monthly],
      ];
      this.title = `Tests taken on ${moment(date).format('MMMM Do YYYY')}, the week before, and the month before.`
      this.isLoading = false;
    });
  }

  changeDate(event: MatDatepickerInputEvent<Date>) {
    const newDate = moment(event.value).format('YYYY-MM-DD')
    console.log(newDate);

    this.getReport(newDate);

  };
}
