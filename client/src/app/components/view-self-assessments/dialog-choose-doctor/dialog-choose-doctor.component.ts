import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'shared/models/models';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-dialog-choose-doctor',
  templateUrl: './dialog-choose-doctor.component.html',
  styleUrls: ['./dialog-choose-doctor.component.css']
})
export class DialogChooseDoctorComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogChooseDoctorComponent>) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  refer(doctor: User) {
    const confirmDialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        question: `Do you really want to assign this patient to Dr. ${doctor.fullName}?`
      },
    });

    confirmDialogRef.afterClosed().subscribe(res => {
      if (res.isConfirm === true) {
        this.dialogRef.close({doctor})
      }
      else {
        this.dialogRef.close()
      }
    });
  }
}
