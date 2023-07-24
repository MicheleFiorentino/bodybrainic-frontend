import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { DoctorInfoService } from 'src/app/services/doctor-info/doctor-info.service';
import { Doctor } from 'src/app/interfaces/doctor';

@Component({
  selector: 'app-doctor-info',
  templateUrl: './doctor-info.component.html',
  styleUrls: ['./doctor-info.component.css']
})
export class DoctorInfoComponent implements OnInit {

  doctor?: Doctor;
  avatar: any;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private docService: DoctorInfoService
  ){}

  ngOnInit(): void {
    let docIdData: any = this.localStorage.getData('doctorId');
    let docId: number = 0;
    if(typeof docIdData === 'string'){
      docId = parseInt(docIdData,10);
    }
    this.initDoctorInfo(docId);
  }

  initDoctorInfo(docId: number){
    this.docService.getDoctorInfo(docId)
    .subscribe(doc => {
      this.doctor = doc;
      this.initDoctorAvatar(doc.imagePath);
    } );
  }

  initDoctorAvatar(avatarPath: string){
    this.docService.getDoctorAvatar(avatarPath)
    .subscribe((img: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.avatar = reader.result as string; // Assign the result as a string to the img property
      };
      reader.readAsDataURL(img);
      },
      error => {
        console.error(error);
      }
    );
  }

  onPatients(){
    this.router.navigate(['/patient-list'])
  }
}
