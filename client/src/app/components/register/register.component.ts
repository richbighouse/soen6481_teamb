import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  fullName = new FormControl('', [Validators.required]);
  dateOfBirth = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [Validators.required]);
  registrationNumber = new FormControl('');
  userType = new FormControl('patient');

  registerForm = new FormGroup({
      email: this.email,
      password: this.password,
      address: this.address,
      fullName: this.fullName,
      dateOfBirth: this.dateOfBirth,
      phoneNumber: this.phoneNumber,
      registrationNumber: this.registrationNumber,
      userType: this.userType,
    }
  );

  constructor() { }

  ngOnInit(): void {
  }

  onRegisterClicked() {
    console.log("Registered clicked!");
  }

  isPatient(): Boolean {
    return this.userType.value === 'patient';
  }

}
