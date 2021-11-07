import { Component, OnInit } from '@angular/core';
import { User } from 'shared/models/models';
import { UserService } from 'src/app/services/user.service';
import { NavigationService } from 'src/app/navigation.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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

  isPatient() {
    console.log(this.currentUser.fkUserType);
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

  getFullName() {
    return this.currentUser.fullName;
  }

  Edit() {
    
  }



}



