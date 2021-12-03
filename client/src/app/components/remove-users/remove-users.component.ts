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
      const nonAdminUsers = res.filter(user => user.fkUserType !== 4)
      this.dataSource.data = nonAdminUsers;
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
      const nonAdminUsers = res.filter(user => user.fkUserType !== 4)
      this.dataSource.data = nonAdminUsers;
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
    } else if (fkUserType === 1) {
      return 'Patient'
    } else {
      return 'Admin'
    }
  }

  sortData(sort: Sort) {
    console.log(sort);

    this.dataSource.data = this.dataSource.data.sort((a: User, b : User) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.id, b.id, isAsc);
        case 'email': return this.compare(a.email, b.email, isAsc);
        case 'fullName': return this.compare(a.fullName, b.fullName, isAsc);
        case 'registrationNumber': return this.compare(a.registrationNumber, b.registrationNumber, isAsc);
        case 'fkUserType': return this.compare(a.fkUserType, b.fkUserType, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
