import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  goLogin() {
    this.router.navigate(['/']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goSelfAssessment() {
    this.router.navigate(['/self-assessment']);
  }

  goViewSelfAssessments() {
    this.router.navigate(['/view-self-assessments']);
  }

  goToPendingApprovals() {
    this.router.navigate(['/pending-approvals']);
  }
}
