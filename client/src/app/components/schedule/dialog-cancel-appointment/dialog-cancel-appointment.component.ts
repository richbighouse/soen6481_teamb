import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { ScheduleService } from 'src/app/services/schedule.service';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-dialog-cancel-appointment',
  templateUrl: './dialog-cancel-appointment.component.html',
  styleUrls: ['./dialog-cancel-appointment.component.css']
})
export class DialogCancelAppointmentComponent implements OnInit {

  patient!: string;
  location!: string;
  date!: string;
  start!: string;
  end!: string;

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogCancelAppointmentComponent>,
    private scheduleService: ScheduleService
  ) {
    const titleArr = data.title.split(',');
    this.patient = titleArr[0];
    this.location = titleArr[1];
    this.date = moment(data.start).format('YYYY-MM-DD');
    this.start = moment(data.start).format('hh:mm A');
    this.end = moment(data.end).format('hh:mm A');
   }

  ngOnInit(): void {
  }

  cancelAppointment(value: boolean) {
    if (value === false) {
      this.dialogRef.close();
    } else {
      const confirmDialogRef = this.dialog.open(DialogConfirmComponent, {
        data: {
          question: "Do you really want to cancel this appointment?"
        },
      });
  
      confirmDialogRef.afterClosed().subscribe(res => {
        if (res.isConfirm === true) {
          this.scheduleService.cancelAppointment(this.data.id).subscribe(
            response => { 
              this.dialogRef.close();
            }  
          )
        } 
      })
    }
  }
}
