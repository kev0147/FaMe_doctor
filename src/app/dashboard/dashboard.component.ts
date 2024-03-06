import { Component } from '@angular/core';
import { Doctor, Token } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  token:Token =  {access:"",refresh:""};
  doctor: Doctor | undefined;
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['access']) {
        this.token.access = params['access'];
        this.token.refresh = params['refresh'];
      }
    });

    this.doctorService.getTheLoggedInDoctor(this.token).subscribe(doctor => this.doctor = doctor);
  }

  constructor(private router: Router, private route: ActivatedRoute,  private doctorService: DoctorService) {}

  goThere(location:string){
    this.router.navigate([location], { queryParams: { access: this.token?.access, refresh: this.token?.refresh } })
  }
}
