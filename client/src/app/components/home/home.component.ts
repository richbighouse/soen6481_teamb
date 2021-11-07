import { Component, OnInit } from '@angular/core';
import { User } from 'shared/models/models';
import { NavigationService } from 'src/app/navigation.service';
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
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe
    (res => {
      this.currentUser = res;
      console.log(this.currentUser);
    },
    err => {
      this.navigationService.goLogin();
    });
  }

  goToSelfAssessment() {
    this.navigationService.goSelfAssessment();
  }

  goToViewSelfAssessments() {
    this.navigationService.goViewSelfAssessments();
  }

  goToApprovals() {
    this.navigationService.goToPendingApprovals();
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
