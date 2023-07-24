import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BwdetailsComponent } from './components/bwdetails/bwdetails.component';
import { DoctorInfoComponent } from './components/doctor-info/doctor-info.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'patient-brainwaves-details', component: BwdetailsComponent},
  {path: 'doctor-info', component: DoctorInfoComponent},
  {path: 'patient-list', component: PatientListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
