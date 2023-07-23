import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})
export class DoctorInfoComponent {

  constructor(
    private router: Router
  ){}

  onPatients(){
    this.router.navigate(['/dashboard'])
  }
}
