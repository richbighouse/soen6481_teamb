import { Component, OnInit } from '@angular/core';
import { Report } from 'shared/models/models';
import { ReportsService } from 'src/app/services/reports.service';
import { ChartType} from 'angular-google-charts'

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css']
})
export class ViewReportsComponent implements OnInit {

  isLoading: boolean = true;

  // chart
  type = ChartType.BarChart;
  data: any[] = [];
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
    this.reportsService.getReport().subscribe(res => {
      this.data = [
        ['Daily', parseInt(res[0].daily)],
        ['Weekly', parseInt(res[0].weekly)],
        ['Monthly', parseInt(res[0].monthly)],
      ];
      this.isLoading = false;
    });
  }
}
