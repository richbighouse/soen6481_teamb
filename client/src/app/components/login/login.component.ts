import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { LoginService } from 'src/app/services/login.service';

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

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onLoginClicked() {
    this.loginService
      .login(this.email.value, this.password.value)
      .subscribe(response => {
        console.log(response);
      })
  }
}
