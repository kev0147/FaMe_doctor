import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsHomeComponent } from './patients-home/patients-home.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';

const routes: Routes = [
  { 
    path: 'patients', 
    component: PatientsHomeComponent, 
    title: 'patients',
    children:[
      { path: '', component: PatientsListComponent, title: "patients's list", children:[] },
      { path: ':id', component: PatientDetailComponent, title: "patient's detail" },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
