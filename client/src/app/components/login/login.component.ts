import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  loginForm = new FormGroup({
      username: this.username,
      password: this.password,
    }
  );

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onLoginClicked() {
    this.loginService
      .login(this.username.value, this.password.value)
      .subscribe(response => {
        console.log(response);
      })

    console.log('click!');
  }

}
