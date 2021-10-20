import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User = new User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe
    (res => {
      this.currentUser = res;
      console.log(this.currentUser);
    },
    err => {
      this.router.navigate(['/login']);
    });
  }

  // We should define these in some currentUserService
  isPatient() {
    return this.currentUser.fkUserType === 1;
  }

  isNurse() {
    return this.currentUser.fkUserType === 3;
  }

  isDoctor() {
    return this.currentUser.fkUserType === 2;
  }

  isManager() {
    return this.currentUser.fkUserType === 4;
  }

}
