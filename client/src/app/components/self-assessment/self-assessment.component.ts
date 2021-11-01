
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { SelfAssessmentTest, User } from 'shared/models/models';
import { NavigationService } from 'src/app/navigation.service';
import { SelfAssessmentTestService } from 'src/app/services/self-assessment-test.service';
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
  q_difficultyBreathing!: boolean | null;
  q_ageRange: string = '';
  q_firstSymptoms!: boolean | null;
  q_situation!: boolean | null;
  q_secondSymptoms!: boolean | null;
  firstDynamicData: boolean = false;
  secondDynamicData: boolean = false;

  // Stepper Control
  canSubmit: boolean = false;
  showAgeRange: boolean = true;
  showFirstSymptoms: boolean = false;
  showFirstDynamicStep: boolean = false;
  showSecondDynamicStep: boolean = false;

  // Button Color Control
  difficultyBreathingSelected: boolean = false;
  hasFirstSymptomsSelected: boolean = false;
  hasFirstDynamicSelected: boolean = false;
  hasSecondDynamicSelected: boolean = false;

  // Strings
  firstSymptomsString: string = '';
  situationString: string = '';
  secondSymptomsString: string = '';

  // Dynamic Strings
  firstDynamicStepLabel: string = 'Additional Information';
  firstDynamicSring: string = '';
  secondDynamicStepLabel: string = 'Additional Information';
  secondDynamicString: string = '';

  // Dynamic methods
  firstDynamicMethod: any;
  secondDynamicMethod: any;

  dynamicMethods = {
    currentSituation: (value: boolean) => {
      this.q_situation = value;
      this.canSubmit = true;
    },
    additionalSymptoms: (value: boolean) => {
      this.q_secondSymptoms = value;

      if (!value) {
        this.canSubmit = true;
        this.showSecondDynamicStep = false;
      } else {
        this.secondDynamicString = this.getCurrentSituationString();
        this.secondDynamicMethod = this.dynamicMethods.currentSituation;
        this.myStepper.next();
      }
    }
  }

  constructor(
    private userService: UserService,
    private navigationService: NavigationService,
    private _formBuilder: FormBuilder,
    private selfAssessmentTestService: SelfAssessmentTestService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe
    (res => {
      this.currentUser = res;
    },
    err => {
      console.log(err);
      this.navigationService.goLogin();
    });

    this.resetTest();
  }

  hasBreathingProblem(value: boolean) {
    this.q_difficultyBreathing = value;
    this.difficultyBreathingSelected = true;
    this.canSubmit = value;

    if (!value) {
      this.showFirstSymptoms = true;
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
    this.q_ageRange = value;
    this.showFirstDynamicStep = true;

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
    this.q_firstSymptoms = value;
    this.hasFirstSymptomsSelected = true;
    this.hasFirstDynamicSelected = false;

    if (!value) {
      if (this.q_ageRange === '5') {
        this.canSubmit = true;
        this.firstDynamicMethod = this.dynamicMethods.currentSituation;
      } else {
        this.firstDynamicMethod = this.dynamicMethods.additionalSymptoms;

        this.firstDynamicStepLabel = "Additional Symptoms";
        this.showSecondDynamicStep = true;
        this.secondDynamicStepLabel = "Current Situation";
        this.secondDynamicString = this.getCurrentSituationString();

        if (this.q_ageRange === '6-17') {
          this.firstDynamicSring = "Does your child have any 2 of the following symptoms?\n"
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
          this.firstDynamicSring = "Are you experiencing any 2 of the following symptoms?\n"
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
        this.situationStepControl.removeControl('situationCtrl');
        this.situationStepControl.updateValueAndValidity();
        this.secondSymptomsStepControl.removeControl('secondSymptomCtrl');
        this.secondSymptomsStepControl.updateValueAndValidity();

        this.myStepper.next();
      }
      
    } else {
      this.firstDynamicStepLabel = "Current Situation"
      this.firstDynamicSring = this.getCurrentSituationString();
      this.firstDynamicMethod = this.dynamicMethods.currentSituation;

      this.situationStepControl.removeControl('situationCtrl');
      this.situationStepControl.updateValueAndValidity();
      this.secondSymptomsStepControl.removeControl('secondSymptomCtrl');
      this.secondSymptomsStepControl.updateValueAndValidity();
      this.myStepper.next();
    }
  }

  firstDynamicClick(value: boolean) {
    this.hasFirstDynamicSelected = true;
    this.firstDynamicData = value;
    this.firstDynamicMethod(value);
  }

  secondDynamicClick(value: boolean) {
    this.hasSecondDynamicSelected = true;
    this.secondDynamicData = value;
    this.secondDynamicMethod(value);
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
    this.showAgeRange = true;
    this.showFirstSymptoms = false;
    this.showFirstDynamicStep = false;
    this.showSecondDynamicStep = false;

    this.difficultyBreathingSelected = false;
    this.q_difficultyBreathing = null;
    this.firstDynamicData = false;
    this.secondDynamicData = false;

    this.q_ageRange = '';

    this.hasFirstSymptomsSelected = false;
    this.q_firstSymptoms = null;
    this.firstSymptomsString = '';

    this.q_situation = null;
    this.situationString = '';

    this.q_secondSymptoms = null;
    this.secondSymptomsString = '';

    this.firstDynamicStepLabel = 'Additional Information';
    this.firstDynamicSring = '';
    this.secondDynamicStepLabel = 'Additional Information';
    this.secondDynamicString = '';

    if (this.myStepper) {
      this.myStepper.reset();
    }
  }

  getCurrentSituationString(): string {
    return "Are you or the person who is going to get tested in one of the situations below?\n"
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
  }

  onSubmit() {
    console.log('q_difficultyBreathing', this.q_difficultyBreathing);
    console.log('q_ageRange', this.q_ageRange);
    console.log('q_firstSymptoms', this.q_firstSymptoms);
    console.log('q_situation', this.q_situation);
    console.log('q_secondSymptoms', this.q_secondSymptoms);

    const selfAssessementTest = new SelfAssessmentTest();
    selfAssessementTest.q_difficultyBreathing = this.q_difficultyBreathing;
    selfAssessementTest.q_ageRange =  this.q_ageRange;
    selfAssessementTest.q_firstSymptoms =  this.q_firstSymptoms;
    selfAssessementTest.q_situation =  this.q_situation;
    selfAssessementTest.q_secondSymptoms =  this.q_secondSymptoms;

    this.selfAssessmentTestService.postSelfAssessmentTest(selfAssessementTest)
    .subscribe(
      response => {
        this.snackBar.open(
          'Self-Assessment Test saved.', 'Dismiss', { duration: 10000, panelClass: ['snackbar-success']});
          this.navigationService.goHome();
      },
      error => {
        this.snackBar.open(
          'Failed to save Self-Assessment Test', 'Dismiss', { duration: 10000, panelClass: ['snackbar-error']});
          this.navigationService.goHome();
      }
    )
  }

  backClickedFromAge(event: any) {
    this.myStepper.previous();
    this.q_ageRange = '';
    this.showFirstDynamicStep = false;
    this.canSubmit = false;
  }

  backClickedFromFirstSymptomsStep(event: any) {
    this.myStepper.previous();
    this.q_firstSymptoms = null;
    this.hasFirstSymptomsSelected = false;
    this.showSecondDynamicStep = false;
    this.canSubmit = false;
  }

  backClickedFromFirstDynamicStep(event: any) {
    this.myStepper.previous();
    this.hasFirstSymptomsSelected = false;
    this.q_situation = null;
    this.q_secondSymptoms = null;
    this.canSubmit = false;
  }

  backClickedFromSecondDynamicStep(event: any) {
    this.myStepper.previous();
    this.hasSecondDynamicSelected = false;
    this.q_secondSymptoms = null;
    this.canSubmit = false;
  }
}