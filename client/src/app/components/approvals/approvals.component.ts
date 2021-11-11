import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { User } from 'shared/models/models';
import { ApprovalService } from 'src/app/services/approval.service';

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
    this.approvalService.postApproveStatus(user).subscribe(
      response => {
        console.log("done")    
      }  
    )
    this.refreshRows(user);
  }

  refreshRows(user:User)
  {
    for (let i = 0; i < this.dataSource.length; i++) 
    {

             if(this.dataSource[i].email == user.email)
             {
               console.log(this.dataSource[i].email)
               this.dataSource.splice(i, 1);
             }
    }
    this.table.renderRows();
  }

  onRejection(user:User) {
    this.approvalService.postRejectStatus(user).subscribe(
      response => {
        console.log("done")     
      }
    )
    this.refreshRows(user);
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
