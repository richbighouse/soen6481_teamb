import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SelfAssessmentComponent } from './components/self-assessment/self-assessment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewSelfAssessmentsComponent } from './components/view-self-assessments/view-self-assessments.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'self-assessment',
    component: SelfAssessmentComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'view-self-assessments',
    component: ViewSelfAssessmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
