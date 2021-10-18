import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { LoginService } from 'src/app/services/login.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    }
  );

  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
  }

  onLoginClicked() {
    this.loginService.login(this.email.value, this.password.value)
      .subscribe(
        response => {
          // redirect to home
        },
        error => {
          if (error.status === 401) {
            console.error("Invalid Credentials", error);
            this.snackBar.open(
              'Invalid credentials. Try again.', 'Dismiss', { duration: 10000 });
          } else {
            console.error("Error", error);
            this.snackBar.open('An error prevented the login. Try again later.', 'Dismiss', {duration: 10000});
          }
          
        }
      )
  }
}
