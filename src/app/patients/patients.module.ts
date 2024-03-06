import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientsHomeComponent } from './patients-home/patients-home.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';


@NgModule({
  declarations: [
    PatientsListComponent,
    PatientsHomeComponent,
    PatientDetailComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
