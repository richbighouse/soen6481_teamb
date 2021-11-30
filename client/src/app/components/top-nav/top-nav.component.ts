import { Component, OnInit } from '@angular/core';
import { User } from 'shared/models/models';
import { NavigationService } from 'src/app/navigation.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  currentUser: User = new User;

  constructor(
    private userService: UserService,
    private navigationService: NavigationService,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe
    (res => {
      this.currentUser = res;
    },
    err => {
      console.log(err);
      this.navigationService.goLogin();
    });
  }

  goHome() {
    this.navigationService.goHome();
  }

  onProfileClicked() {
    console.log("Routing to profile.");
    this.router.navigate(['/profile']);
  }

  onLogoutClicked() {
    console.log("Logout clicked");
    this.loginService.logout()
    .subscribe(res => {
      console.log('Redirecting to Login page...')
      this.navigationService.goLogin()
    })
  }

}
