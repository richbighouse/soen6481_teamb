import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { ScheduleEvent, User } from 'shared/models/models';
import { NavigationService } from 'src/app/navigation.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  userId!: number;
  scheduleEvents: ScheduleEvent[] = []
  displayEvents: any[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    contentHeight: '75vh',
    dayMaxEventRows: true, // for all non-TimeGrid views
    views: {
      dayGridMonth: {
        displayEventEnd: true
      },
      timeGrid: {
        dayMaxEventRows: 4 // adjust to 6 only for timeGridWeek/timeGridDay
      }
    },
    events: [this.displayEvents],
    eventClick: function(eventClickInfo ) {
      console.log(eventClickInfo.event);
    }
  };

  constructor(
    private scheduleService: ScheduleService,
    private userService: UserService,
    private navigationService: NavigationService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.userId = parseInt(params.get('userId')!);

        console.log('path param:', this.userId);
      
        this.scheduleService.getSchedule(this.userId)
          .subscribe(
            res => {
              console.log(res);
              this.scheduleEvents = res;
              this.scheduleEvents.forEach(e => {
                this.displayEvents.push(
                  {
                    title: `${e.patientFullName}`,
                    start: `${e.dateTime}`,
                    end: `${moment(e.dateTime).add(1, 'hours').toISOString()}`,
                    id: `${e.scheduleId}`
                  }
                )
              }
              )
              this.calendarOptions = {
                initialView: 'dayGridMonth',
                contentHeight: '75vh',
                dayMaxEventRows: true, // for all non-TimeGrid views
                views: {
                  dayGridMonth: {
                    displayEventEnd: true
                  },
                  timeGrid: {
                    dayMaxEventRows: 4 // adjust to 6 only for timeGridWeek/timeGridDay
                  }
                },
                events: this.displayEvents,
                eventClick: function(eventClickInfo ) {
                  console.log(eventClickInfo.event);
                }
              };
            },
            err => {
              this.snackBar.open(
                'Failed to retrive schedule', 'Dismiss', { duration: 10000, panelClass: ['snackbar-error']});
                this.navigationService.goHome();
            }
      )
    },
    err => {
      this.navigationService.goLogin();
    });
  }

}
