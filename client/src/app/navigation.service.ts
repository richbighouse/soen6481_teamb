import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  goLogin() {
    this.router.navigate(['login']);
  }

  goHome() {
    this.router.navigate(['home']);
  }

  goSelfAssessment() {
    this.router.navigate(['/self-assessment']);
  }
}
