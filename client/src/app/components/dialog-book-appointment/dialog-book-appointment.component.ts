import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { ScheduleEvent } from 'shared/models/models';
import { ScheduleService } from 'src/app/services/schedule.service';
import { NavigationService } from 'src/app/navigation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Observable, Subscription } from 'rxjs';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import * as moment from 'moment';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-book-appointment',
  templateUrl: './dialog-book-appointment.component.html',
  styleUrls: ['./dialog-book-appointment.component.css']
})
export class DialogBookAppointmentComponent implements OnInit, OnDestroy {

  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  location: string = '';
  displayEvents: any[] = [];
  scheduleEvents: ScheduleEvent[] = []
  isLoading: boolean = true;

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    contentHeight: '70vh',
    allDaySlot: false,
    events: this.displayEvents,
    eventClick: function(eventClickInfo ) {
      console.log(eventClickInfo.event);
    }
  };

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogBookAppointmentComponent>,
    private scheduleService: ScheduleService,
    private navigationService: NavigationService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.refreshCalendar();
  }

  refreshCalendar() {
    this.isLoading = true;

    this.scheduleService.getSchedule(this.data.professional.id).subscribe(
      res => {
        console.log('getSchedule', res);
        this.scheduleEvents = res;
        this.displayEvents = [];
        this.scheduleEvents.forEach(e => {
          this.displayEvents.push(
            {
              title: `${e.patientFullName}, ${e.location}`,
              start: `${e.startDateTime}`,
              end: `${e.endDateTime}`,
              id: `${e.scheduleId}`
            }
          )
        }
        )
        this.calendarOptions = {
          initialView: 'timeGridWeek',
          aspectRatio: 2,
          contentHeight: '70vh',
          selectable: true,
          selectMirror: true,
          selectOverlap: false,
          weekends: false,
          allDaySlot: false,
          nowIndicator: true,
          eventMinHeight: 20,
          slotMinTime: '06:00:00',
          slotMaxTime: '23:00:00',
          scrollTime: '07:00:00',
          events: this.displayEvents,
          select: (select) => {
            const day = moment(select.startStr).format('YYYY-MM-DD');
            const startTime = moment(select.startStr).format('hh:mm A');
            const endTime = moment(select.endStr).format('hh:mm A');
            const patient = this.data.patientTest.fullName;

            if (this.location === '') {
              this.snackBar.open('A location is required.', 'Dismiss', { 
                duration: 10000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              });
              return;
            }

            const confirmDialogRef = this.dialog.open(DialogConfirmComponent, {
              data: {
                question: `Book an appoitment with ${patient} on ${day} from ${startTime} to ${endTime} at ${this.location}?`
              },
            });

            confirmDialogRef.afterClosed().subscribe(res => {
              if (res.isConfirm === true) {
                this.scheduleService.postAppoitment(
                  this.location,
                  moment(select.startStr).format('YYYY-MM-DD HH:mm:ss'),
                  moment(select.endStr).format('YYYY-MM-DD HH:mm:ss'),
                  this.data.patientTest.userId,
                  this.data.professional.id
                ).subscribe(
                  response => {
                    this.snackBar.open('Appointment succesfully booked.', 'Dismiss', { duration: 10000});
                      setTimeout(() => {
                        this.isLoading = false;
                        this.refreshCalendar();
                      }, 200)               
                  }
                )
              }
            })
          }
        };

        setTimeout(() => {
          this.isLoading = false;
        }, 200)      
      },
      err => {
        this.snackBar.open(
          'Failed to retrive schedule', 'Dismiss', { duration: 10000, panelClass: ['snackbar-error']});
          this.navigationService.goHome();
      });
  }

  ngOnDestroy() {
    this.displayEvents = [];
    this.scheduleEvents = [];
    this.isLoading = true;
    this.calendarOptions = {};
  }
}
