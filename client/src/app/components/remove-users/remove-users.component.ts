import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { User } from 'shared/models/models';
import { UserService } from 'src/app/services/user.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-remove-users',
  templateUrl: './remove-users.component.html',
  styleUrls: ['./remove-users.component.css']
})
export class RemoveUsersComponent implements OnInit, AfterViewInit{

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = [ 'user-id', 'user-name', 'user-type','email', 'registrationnumber' , 'actions'];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
  ) { }
  
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe
    (res => {
      console.log(res);
      console.log("testing now");
      this.dataSource.data = res;
    },
    err => {
      console.log(err);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  refreshRows(user:User) {
    this.userService.getAllUsers().subscribe
    (res => {
      console.log(res);
      console.log("testing now");
      this.dataSource.data = res;
    },
    err => {
      console.log(err);
    });
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

  getUserType(fkUserType: number)
  {
    if (fkUserType === 3) {
      return 'Nurse'
    } else if (fkUserType === 2) {
      return 'Doctor'
    } else {
      return 'Patient'
    }
  }

}
