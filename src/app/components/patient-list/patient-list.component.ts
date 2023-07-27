import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Patient } from 'src/app/interfaces/patient';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { PatientInfoService } from 'src/app/services/patient-info/patient-info.service';
import { PatientDisplay } from './context-model/patient-display';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit{

  displayedColumns: string[] = ['image', 'name', 'surname', 'sex', 'email', 'countryFlag'];
  patientDataSource = new MatTableDataSource<PatientDisplay>

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private patService: PatientInfoService
  ){}

  ngOnInit(){
    let docIdData: any = this.localStorage.getData('doctorId');
    let docId: number = 0;
    if(typeof docIdData === 'string'){
      docId = parseInt(docIdData,10);
    }
    this.initDoctorPatientList(docId);
  }

  initDoctorPatientList(docId: number){
    this.getDoctorPatientList(docId);
  }

  /*

  getDoctorPatientList(docId: number){
    this.patService.getAllPatientsByDoctorId(docId)
    .subscribe(patList => {
      // Map each patient to PatientDisplay and add avatarImage and countryFlagImage
      this.patientDataSource.data = patList.map((patient) => ({
        ...patient,
        avatarImage: this.getPatientAvatar(patient.imagePath),
        countryFlagPath: this.getCountryFlagImagePath(patient.country)
      }));
      console.log(patList.at(0))
    });
  }



  getPatientAvatar(avatarPath: string){
    this.patService.getPatientAvatar(avatarPath)
    .subscribe((img: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        return reader.result as string; // Assign the result as a string to the img property
      };
      reader.readAsDataURL(img);
      },
      error => {
        console.error(error);
      }
    );
    return '';
  }

  */

  getPatientAvatar(avatarPath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.patService.getPatientAvatar(avatarPath).subscribe(
        (img: Blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string); // Resolve the base64 image string
          };
          reader.onerror = () => {
            reject(new Error('Error reading the Blob as base64.'));
          };
          reader.readAsDataURL(img);
        },
        error => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  async getDoctorPatientList(docId: number) {
    try {
      const patList = await this.patService.getAllPatientsByDoctorId(docId).toPromise();

      if (patList) {
        // Map each patient to PatientDisplay and add avatarImage and countryFlagImage
        const mappedPatients = await Promise.all(patList.map(async (patient) => ({
          ...patient,
          avatarImage: await this.getPatientAvatar(patient.imagePath),
          countryFlagPath: this.getCountryFlagImagePath(patient.country)
        })));

        this.patientDataSource.data = mappedPatients;
        console.log(patList[0]);
      } else {
        console.error("Patient list is undefined.");
      }
    } catch (error) {
      console.error(error);
    }
  }




  getCountryFlagImagePath(country: string){
    return "assets/flags/" + country + ".png";
  }

}
