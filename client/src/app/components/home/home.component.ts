import { Component, OnInit } from '@angular/core';
import { User } from 'shared/models/models';
import { NavigationService } from 'src/app/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User = new User;

  constructor(
    private userService: UserService,
    private navigationService: NavigationService,
    private router: Router,
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

  goToViewTestStatus() {
    this.navigationService.goViewTestStatus(this.currentUser.id);
  }

  goToViewSelfAssessments() {
    this.navigationService.goViewSelfAssessments();
  }

  goViewAssignedPatients() {
    this.navigationService.goViewAssignedPatients();
  }

  goToApprovals() {
    this.navigationService.goToPendingApprovals();
  }

  goToSchedule() {
    this.navigationService.goToSchedule(this.currentUser.id);
  }

  goToReports() {
    this.navigationService.goToReports();
  }

  goToRemoveUsers() {
    console.log("Routing to remove-users.");
    this.router.navigate(['/remove-users']);
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
