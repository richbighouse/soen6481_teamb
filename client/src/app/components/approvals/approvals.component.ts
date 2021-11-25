import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { User } from 'shared/models/models';
import { ApprovalService } from 'src/app/services/approval.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {
  dataSource!: User[];
  displayedColumns: string[] = [ 'user-id', 'user-name', 'user-type','email', 'registrationnumber' , 'actions'];

  @ViewChild(MatTable) table!: MatTable<User>;

  constructor(
    private approvalService: ApprovalService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.approvalService.getUnApprovedUsers().subscribe
    (res => {
      console.log(res);
      console.log("testing now");
      this.dataSource = res;

      for (let i = 0; i < this.dataSource.length; i++) 
      {
  
               if(this.dataSource[i].fkUserType == 1)
               {
                 console.log(this.dataSource[i].email)
                 this.dataSource.splice(i, 1);
               }
      }
    },
    err => {
      console.log(err);

    });
  }

  onApproval(user:User) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        question: "Do you really want to approve this user's registration?"
      },
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.isConfirm === true) {
        this.approvalService.postApproveStatus(user).subscribe(
          response => {
            console.log("done")    
          }  
        )
        this.refreshRows(user)
      }
    })
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

  onRejection(user:User) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        question: "Do you really want to reject this user's registration?"
      },
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.isConfirm === true) {
        this.approvalService.postRejectStatus(user).subscribe(
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
    } else
    {
      return 'Doctor'
    }
  }
}
