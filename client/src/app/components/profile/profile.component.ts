import { Component, OnInit } from '@angular/core';
import { User, EditProfileRequest } from 'shared/models/models';
import { UserService } from 'src/app/services/user.service';
import { NavigationService } from 'src/app/navigation.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  address = new FormControl('', [Validators.required]);
  fullName = new FormControl('', [Validators.required]);
  dateOfBirth = new FormControl('', [Validators.required]);
  phoneNumber = new FormControl('', [Validators.required]);

  updateForm = new FormGroup({
    fullName: this.fullName,
    address: this.address,
    dateOfBirth: this.dateOfBirth,
    phoneNumber: this.phoneNumber
  }
);

  currentUser: User = new User;

  constructor(
    private userService: UserService,
    private navigationService: NavigationService,
    private snackBar: MatSnackBar
  ) { }

  editMode: boolean = false;
  
  editModeFullName: boolean = false;
  editModeAddress: boolean = false;
  editModePhoneNumber: boolean = false;
  editModeDateOfBirth: boolean = false;

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

  isPatient() {
    return this.currentUser.fkUserType === 1;
  }

  isNurse() {
    return this.currentUser.fkUserType === 3;
  }

  isDoctor() {
    return this.currentUser.fkUserType === 2;
  }

  isManager() {
    return this.currentUser.fkUserType === 4;
  }

  getFullName() {
    return this.currentUser.fullName;
  }

  onEdit() {
    const currentUser = this.currentUser;
    const editProfileRequest = new EditProfileRequest(
      currentUser.email,
      this.address.value,
      this.fullName.value ,
      this.dateOfBirth.value,
      this.phoneNumber.value
    );

    this.userService.updateUser(editProfileRequest)
    .subscribe(
      response => {
        console.log("Updated Successful");
      },
      error => {
        console.log("Updated Failed");
      }
    )
  }

  onEditFullName() {

    const currentUser = this.currentUser;
    console.log(currentUser);

    if (!this.fullName.value.length) {
      console.error("Field Cannot be Empty!");
            this.snackBar.open(
              'Full Name Field Cannot be Empty! Try again.', 'Dismiss', { duration: 10000, panelClass: ['snackbar-error']});
    }
    else if (this.fullName.value !== this.currentUser) {                
      const editProfileRequest = new EditProfileRequest(
        currentUser.email,
        currentUser.address,
        this.fullName.value,
        currentUser.dateOfBirth,
        currentUser.phoneNumber
      );

      this.userService.updateUser(editProfileRequest)
      .subscribe(
        response => {
          console.log("Updated Successful");
        },
        error => {
          console.log("Updated Failed");
        }
      )
    }  
  }

  onEditAddress() {

    const currentUser = this.currentUser;
    console.log(currentUser);

    if (!this.address.value.length) {
      console.error("Field Cannot be Empty!");
            this.snackBar.open(
              'Address Field Cannot be Empty! Try again.', 'Dismiss', { duration: 10000, panelClass: ['snackbar-error']});
    }
    else if (this.address.value !== this.currentUser) {                
      const editProfileRequest = new EditProfileRequest(
        currentUser.email,
        this.address.value,
        currentUser.fullName,
        currentUser.dateOfBirth,
        currentUser.phoneNumber
      );

      this.userService.updateUser(editProfileRequest)
      .subscribe(
        response => {
          console.log("Updated Successful");
        },
        error => {
          console.log("Updated Failed");
        }
      )
    }  
  }

  onEditPhoneNumber() {

    const currentUser = this.currentUser;
    console.log(currentUser);

    if (this.phoneNumber.value == null) {
      console.error("Field Cannot be Empty!");
            this.snackBar.open(
              'Phone Number Field Cannot be Empty! Try again.', 'Dismiss', { duration: 10000, panelClass: ['snackbar-error']});
    }
    else if (this.phoneNumber.value !== this.currentUser) {                
      const editProfileRequest = new EditProfileRequest(
        currentUser.email,
        currentUser.address,
        currentUser.fullName,
        currentUser.dateOfBirth,
        this.phoneNumber.value
      );

      this.userService.updateUser(editProfileRequest)
      .subscribe(
        response => {
          console.log("Updated Successful");
        },
        error => {
          console.log("Updated Failed");
        }
      )
    }  
  }

  onEditDateOfBirth() {

    const currentUser = this.currentUser;
    console.log(currentUser);

    if (this.dateOfBirth.value !== this.currentUser) {                
      const editProfileRequest = new EditProfileRequest(
        currentUser.email,
        currentUser.address,
        currentUser.fullName,
        this.dateOfBirth.value,
        currentUser.phoneNumber
      );

      this.userService.updateUser(editProfileRequest)
      .subscribe(
        response => {
          console.log("Updated Successful");
        },
        error => {
          console.log("Updated Failed");
        }
      )
    }  
  }

  goHome() {
    this.navigationService.goHome();
  }


}




