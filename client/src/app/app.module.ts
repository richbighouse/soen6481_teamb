import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { RegisterComponent } from './components/register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './components/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SelfAssessmentComponent } from './components/self-assessment/self-assessment.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewSelfAssessmentsComponent } from './components/view-self-assessments/view-self-assessments.component';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogChooseDoctorComponent } from './components/view-self-assessments/dialog-choose-doctor/dialog-choose-doctor.component';
import { MatListModule } from '@angular/material/list';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AssessmentListComponent } from './components/assessment-list/assessment-list.component';
import { ViewAssignedPatientsComponent } from './components/view-assigned-patients/view-assigned-patients.component'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ViewTestStatusComponent } from './components/view-test-status/view-test-status.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatChipsModule} from '@angular/material/chips';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { DialogBookAppointmentComponent } from './components/dialog-book-appointment/dialog-book-appointment.component';
import { ViewReportsComponent } from './components/view-reports/view-reports.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { DialogCancelAppointmentComponent } from './components/schedule/dialog-cancel-appointment/dialog-cancel-appointment.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SelfAssessmentComponent,
    TopNavComponent,
    ProfileComponent,
    ViewSelfAssessmentsComponent,
    ApprovalsComponent,
    DialogChooseDoctorComponent,
    ScheduleComponent,
    AssessmentListComponent,
    ViewAssignedPatientsComponent,
    ViewTestStatusComponent,
    DialogConfirmComponent,
    DialogBookAppointmentComponent,
    ViewReportsComponent,
    DialogCancelAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatStepperModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatListModule,
    FullCalendarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatChipsModule,
    GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
