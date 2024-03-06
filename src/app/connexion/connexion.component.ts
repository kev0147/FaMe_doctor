import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token, User } from '../models';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

export class ConnexionComponent {
  user: User | undefined;
  token : Token | undefined;
  
  userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],     
    },
  );

  constructor(private fb: FormBuilder, private doctorService: DoctorService, private router: Router){}

  onSubmit(){
    const user: User = {
      username : this.userForm.value?.username!,
      password : this.userForm.value.password!
    }
    console.log(user);
    this.doctorService.getToken(user).subscribe(token=>this.token = token);
    
    const accessToken = this.token?.access;
    if (accessToken) {
      this.goToDashboard();
    }
  }

  goToDashboard(){
    this.router.navigate(['dashboard'], { queryParams: { access: this.token?.access, refresh: this.token?.refresh } });
  }

  goBack(){
    this.router.navigate(['']);
  }

}
