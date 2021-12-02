import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { User } from 'shared/models/models';
import { UserService } from 'src/app/services/user.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-remove-users',
  templateUrl: './remove-users.component.html',
  styleUrls: ['./remove-users.component.css']
})
export class RemoveUsersComponent implements OnInit {

  dataSource!: User[];
  displayedColumns: string[] = [ 'user-id', 'user-name', 'user-type','email', 'registrationnumber' , 'actions'];

  @ViewChild(MatTable) table!: MatTable<User>;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe
    (res => {
      console.log(res);
      console.log("testing now");
      this.dataSource = res;
    },
    err => {
      console.log(err);
    });
  }

  refreshRows(user:User)
  {
    for (let i = 0; i < this.dataSource.length; i++) 
    {
      if(this.dataSource[i].email == user.email) {
        console.log(this.dataSource[i].email)
        this.dataSource.splice(i, 1);
      }
    }
    this.table.renderRows();
  }

  onDelete(user:User) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        question: "Do you really want to delete this user?"
      },
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.isConfirm === true) {
        this.userService.postDeleteUser(user).subscribe(
          response => {
            console.log("done")     
          }
        )
        this.refreshRows(user);
      }
    })
  }

  getUserType(userType: number)
  {
    if (userType === 3) {
      return 'Nurse'
    } else if (userType === 2) {
      return 'Doctor'
    } else {
      return 'Patient'
    }
  }

}
