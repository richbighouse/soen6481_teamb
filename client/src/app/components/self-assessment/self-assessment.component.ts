import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/navigation.service';
import { User } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.css']
})
export class SelfAssessmentComponent implements OnInit {

  currentUser: User = new User;
  

  // Assessment Data ... this can be improved
  hasBreathingProblems: boolean = false;
  ageRange: string = '';

  // Stepper Control
  canSubmit: boolean = false;
  showAgeRange: boolean = false;

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

  hasBreathingProblem(value: boolean) {
    this.hasBreathingProblems = value;
    // if YES, don't show next steps and allow submit. Else, opposite
    this.showAgeRange = !value;
    this.canSubmit = value;
  }

  setAgeRange(value: string) {
    this.ageRange = value;
  }

  goHome() {
    this.navigationService.goHome();
  }

}
