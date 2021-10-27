import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { NavigationService } from 'src/app/navigation.service';
import { User } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-self-assessment',
  templateUrl: './self-assessment.component.html',
  styleUrls: ['./self-assessment.component.css']
})
export class SelfAssessmentComponent implements OnInit {

  @ViewChild('stepper', { static: false }) private myStepper!: MatStepper;
  currentUser: User = new User;
  ageStepControl!: FormGroup;
  firstSymptomsStepControl!: FormGroup;
  situationStepControl!: FormGroup;
  secondSymptomsStepControl!: FormGroup;
  

  // Assessment Data ... this can be improved
  hasBreathingProblemsData: boolean = false;
  ageRangeData: string = '';
  hasFirstSymptomsData: boolean = false;
  hasSituationData: boolean = false;
  hasSecondSymptomsData: boolean = false;

  // Stepper Control
  canSubmit: boolean = false;
  showAgeRange: boolean = true;
  showFirstSymptoms: boolean = true;

  // Button Color Control
  hasBreatingProblemsSelected: boolean = false;
  hasFirstSymptomsSelected: boolean = false;
  hasSituationSelected: boolean = false;
  hasSecondSymptomsSelected: boolean = false;

  // Strings
  firstSymptomsString: string = '';
  situationString: string = '';
  secondSymptomsString: string = '';

  constructor(
    private userService: UserService,
    private navigationService: NavigationService,
    private _formBuilder: FormBuilder
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

    this.resetTest();
  }

  hasBreathingProblem(value: boolean) {
    this.hasBreathingProblemsData = value;
    this.hasBreatingProblemsSelected = true;
    this.canSubmit = value;

    if (!value) {
      this.ageStepControl.removeControl('ageCtrl');
      this.ageStepControl.updateValueAndValidity();
      this.myStepper.next();
    } else {
      this.ageStepControl.addControl('ageCtrl', this._formBuilder.control('', [Validators.required]));
      this.ageStepControl.updateValueAndValidity();
      this.myStepper.next();
    }
  }

  setAgeRange(value: string) {
    this.ageRangeData = value;

    this.firstSymptomsStepControl.removeControl('firstSymptomsCtrl');
    this.firstSymptomsStepControl.updateValueAndValidity();
    this.myStepper.next();

    if (value === '5') {
      this.firstSymptomsString = "Is your child experiencing <strong>ANY</strong> of the following symptoms?"
      + "<ul>"
      + "<li> Fever (38.5°C rectal temperature (101.3°F) or higher) </li>"
      + "<li> Cough (new or worse), shortness of breath, or difficulty breathing </li>"
      + "<li> Sore throat <strong>AND</strong> fever (38.1°C rectal temperature (100.6°F) or higher) </li>"
      + "<li> Abdominal pain, vomiting, or diarrhea <strong>AND</strong> fever (38.1°C rectal temperature (100.6°F) or higher) </li>"
      + "</ul>"
    } else if (value === '6-17') {
      this.firstSymptomsString = "Does your child have <strong>ANY</strong> of the following symptoms?\n"
      + "<ul>"
      + "<li> Fever (oral temperature <strong>38.1°C (100.6°F)</strong> or higher) </li>"
      + "<li> Sudden loss of sense of smell (anosmia) without nasal congestion, with or without loss of taste </li>"
      + "<li> Recent cough or worsening of a chronic cough </li>"
      + "<li> Shortness of breath </li>"
      + "<li> Trouble breathing </li>"
      + "<li> Sore throat </li>"
      + "</ul>"
    } else {
      this.firstSymptomsString = "Are you experiencing <strong>ANY</strong> of the following symptoms?\n"
      + "<ul>"
      + "<li> Fever (oral temperature <strong>38.1°C (100.6°F)</strong> or higher) </li>"
      + "<li> Sudden loss of sense of smell (anosmia) without nasal congestion, with or without loss of taste </li>"
      + "<li> Recent cough or worsening of a chronic cough </li>"
      + "<li> Shortness of breath </li>"
      + "<li> Trouble breathing </li>"
      + "<li> Sore throat </li>"
      + "</ul>"
    }
  }

  hasFirstSymptoms(value: boolean) {
    this.hasFirstSymptomsData = value;
    this.hasFirstSymptomsSelected = true;

    if (!value) {
      if (this.ageRangeData === '5') {
        this.canSubmit = true;
      } else {
        if (this.ageRangeData === '6-17') {
          this.secondSymptomsString = "Does your child have any 2 of the following symptoms?\n"
          + "<ul>"
          + "<li> Stomach aches </li>"
          + "<li> Nausea or vomiting </li>"
          + "<li> Diarrhea </li>"
          + "<li> Major fatigue </li>"
          + "<li> Significant loss of appetite </li>"
          + "<li> Generalized muscle pain (not related to physical exertion) </li>"
          + "<li> Headache </li>"
          + "</ul>" 
        } else {
          this.secondSymptomsString = "Are you experiencing any 2 of the following symptoms?\n"
          + "<ul>"
          + "<li> Stomach aches </li>"
          + "<li> Nausea or vomiting </li>"
          + "<li> Diarrhea </li>"
          + "<li> Major fatigue </li>"
          + "<li> Significant loss of appetite </li>"
          + "<li> Generalized muscle pain (not related to physical exertion) </li>"
          + "<li> Headache </li>"
          + "</ul>" 
        }
        console.log('do i get here');
        this.situationStepControl.removeControl('situationCtrl');
        this.situationStepControl.updateValueAndValidity();
        this.secondSymptomsStepControl.removeControl('secondSymptomCtrl');
        this.secondSymptomsStepControl.updateValueAndValidity();

        this.myStepper.steps.get(3)!.interacted = true;
        this.myStepper.selectedIndex = 4;
      }
      
    } else {
      this.situationString = "Are you or the person who is going to get tested in one of the situations below?\n"
      + "<ul>"
      + "<li> Is 0 to 3 months old </li>"
      + "<li> Is experiencing an obstruction of nasal passages other than normal congestion </li>"
      + "<li> Is currently having a nosebleed episode </li>"
      + "<li> Has had a nosebleed episode in the past week </li>"
      + "<li> Has undergone any of the following types of surgery: </li>"
      + "<ul>"
      + "<li> Mouth surgery in the past week? </li>"
      + "<li> Nose surgery in the past month (adult) <strong>OR</strong> Nose surgery in the past 3 weeks (child)</li>"
      + "</ul>"
      + "<li> Is currently wheezing. </li>"
      + "</ul>"

      this.situationStepControl.removeControl('situationCtrl');
      this.myStepper.next();
    }
  }

  hasSituation(value: boolean) {
    this.hasSituationSelected = true;
    this.hasSituationData = value;

    this.canSubmit = true;
  }

  goHome() {
    this.navigationService.goHome();
  }

  resetTest() {
    this.ageStepControl = this._formBuilder.group({
      ageCtrl: ['', Validators.required]
    });
    this.firstSymptomsStepControl = this._formBuilder.group({
      firstSymptomsCtrl: ['', Validators.required]
    });
    this.situationStepControl = this._formBuilder.group({
      situationCtrl: ['', Validators.required]
    });
    this.secondSymptomsStepControl = this._formBuilder.group({
      secondSymptomCtrl: ['', Validators.required]
    });

    this.canSubmit = false;

    this.hasBreatingProblemsSelected = false;
    this.hasBreathingProblemsData = false;

    this.ageRangeData = '';

    this.hasFirstSymptomsSelected = false;
    this.hasFirstSymptomsData = false;
    this.firstSymptomsString = '';

    this.hasSituationSelected = false;
    this.hasSituationData = false;
    this.situationString = '';

    this.hasSecondSymptomsData = false;
    this.hasSecondSymptomsSelected = false;
    this.secondSymptomsString = '';

    if (this.myStepper) {
      this.myStepper.reset();
    }
  }
}
