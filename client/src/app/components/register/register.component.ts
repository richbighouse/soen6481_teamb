import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from 'src/app/services/register.service';
import { MatSnackBar} from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import { RegistrationRequest } from 'shared/models/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = new FormControl('', [Validators.email, Validators.required]);
  password = new FormControl('', [Validators.required]);
  address = new FormControl('', [Validators.required]);
  fullName = new FormControl('', [Validators.required]);
  dateOfBirth = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [Validators.required]);
  registrationNumber = new FormControl(''); // Need a custom validator for this
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

  constructor(
    private registerService: RegisterService,
    private snackBar: MatSnackBar,
    private router: Router,
    ) { }

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
      this.snackBar.open('Registration succesful. Please login.', 'Dismiss', {duration: 10000});
      this.router.navigate(['/login']);
    },
    error => {
      console.error("Error", error);
      this.snackBar.open('An error prevented registration. Try again later.', 'Dismiss', {duration: 10000});
    }
    );
  }

  isPatient(): Boolean {
    return this.userType.value === 'patient';
  }
}
