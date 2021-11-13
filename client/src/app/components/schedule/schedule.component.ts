import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

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
    events: [
      { title: 'event 1', start: '2021-11-01T12:30:00', end: '2021-11-01T14:30:00' },
      { title: 'event 2', date: '2021-11-02' },
      { title: 'event 3', date: '2021-11-02' },
      { title: 'event 4', date: '2021-11-02' },
      { title: 'event 5', date: '2021-11-02' },
      { title: 'event 6', date: '2021-11-02' }
    ],
    eventClick: function(eventClickInfo ) {
      console.log(eventClickInfo.event);
      console.log(eventClickInfo.event.start);
      console.log(eventClickInfo.event.title);
    }


    
  };

  constructor() { }

  ngOnInit(): void {
  }

}
