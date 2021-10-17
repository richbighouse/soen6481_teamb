import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { RegisterService, RegistrationRequest } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = new FormControl('', [Validators.email]);
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

  constructor(private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  onRegisterClicked() {
    const registrationRequest = new RegistrationRequest(
      this.email.value,
      this.password.value,
      this.address.value,
      this.fullName.value,
      this.dateOfBirth.value,
      this.phoneNumber.value,
      this.registrationNumber.value,
      this.userType.value
    )

    this.registerService.register(registrationRequest)
    .subscribe(response => {
      console.log(response);
    });
  }

  isPatient(): Boolean {
    return this.userType.value === 'patient';
  }
}
