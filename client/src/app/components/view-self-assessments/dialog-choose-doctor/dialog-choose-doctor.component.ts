import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'shared/models/models';

@Component({
  selector: 'app-dialog-choose-doctor',
  templateUrl: './dialog-choose-doctor.component.html',
  styleUrls: ['./dialog-choose-doctor.component.css']
})
export class DialogChooseDoctorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogChooseDoctorComponent>) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  refer(doctor: User) {
    this.dialogRef.close({data: doctor})
  }
}
