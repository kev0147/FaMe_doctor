import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/doctor.service';
import { Doctor, Patient, Token } from 'src/app/models';
import { PatientsService } from 'src/app/patients.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent {
  constructor(private patientsService: PatientsService, private doctorService: DoctorService, private router: Router, private route: ActivatedRoute) {}

  category: string | null = '';
  patients: Patient[] = [];
  doctor!: Doctor;
  selectedPatient?: Patient;
  token:Token =  {access:"",refresh:""};

  ngOnInit(): void {
    
    this.route.queryParams.subscribe(params => {
      if (params['access']) {
        this.token.access = params['access'];
        this.token.refresh = params['refresh'];

      }else{
        console.log('lol')
        //this.goToLoggin();
      }
      this.getDoctorPatients();
      this.doctorService.getTheLoggedInDoctor(this.token).subscribe(doctor => this.doctor = doctor);
    });
  }

  goToLoggin(){
    this.router.navigate(['']);
  }

  goBack(){
    this.router.navigate(['/home'], { queryParams: { access: this.token.access, refresh: this.token.refresh }});
  }

  getDoctorPatients(): void {
    this.patientsService.getPatientsOfDoctor(this.token, this.doctor.id!)
        .subscribe(patients => this.patients = patients);
  }

  selectPatient(patient: Patient){
    this.selectedPatient = patient;
    this.router.navigate(['patientDetail'], { queryParams: { patient_id: patient.id } });
  }

}
