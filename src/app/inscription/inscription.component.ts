import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor, Profile } from '../models';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent {
  signed_up : Boolean = false;
  validationButtonHasBeenPressed : Boolean = false;
  signedUpDoctor: Doctor | undefined;
  doctorForm = this.fb.group(
    {
      profileForm: this.fb.group({
        name: ['', Validators.required],
        firstname: ['', Validators.required],
        phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        email: ['', Validators.email]
      }),
      speciality: ['', Validators.required],
      doctors_order_number : ['', Validators.required]
    },
  );

  
  constructor(private fb: FormBuilder, private doctorSersice: DoctorService, private router: Router) { }

  onSubmit() {
    this.validationButtonHasBeenPressed = true;
    if(this.doctorForm.valid){
      this.validationButtonHasBeenPressed = true;
      const signedUpDoctor = this.formBuilderToPatient(this.doctorForm)
      this.addDoctorInDatabase(signedUpDoctor);
      console.log(signedUpDoctor);
      //if(this.signedUpPatient){this.signed_up = true;}
      this.signed_up = true;
      this.goToChatPage(signedUpDoctor.id!);
    }
    
  }

  goToChatPage(patientId: string) {
    this.router.navigate(['chat'], { queryParams: { patientId: patientId } });
  }

  formBuilderToPatient(form:FormGroup){
    const doctorProfile: Profile = {
      name: form.value.profileForm?.name!,
      firstname: form.value.profileForm?.firstname!,
      email: form.value.profileForm?.email!,
      phone_number: Number(form.value.profileForm?.phone_number!)
    }
    const signedUpDoctor: Doctor = {
      doctors_order_number: form.value.doctors_order_number,
      speciality: form.value.speciality!,
      profile: doctorProfile
    };
    return signedUpDoctor;
  }

  addDoctorInDatabase(doctor: Doctor) {
    this.doctorSersice.addDoctor(doctor)
      .subscribe(doctor => {
        this.signedUpDoctor = doctor;
      });
  }

  goBack(){
    this.router.navigate(['']);
  }
}
