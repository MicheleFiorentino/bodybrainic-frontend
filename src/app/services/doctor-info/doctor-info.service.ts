import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Doctor } from 'src/app/interfaces/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorInfoService {

  private baseUrl = 'http://localhost:8080/bodybrainic';
  private docInfoUrl = '/doctor/byId';
  private docAvatarUrl = '/doctor/avatarByPath';

  constructor(private http: HttpClient) { }

  getDoctorInfo(doctorID: number): Observable<Doctor>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append('id',doctorID);
    return this.http.
      get<Doctor>(this.baseUrl.concat(this.docInfoUrl),
      {params:queryParams});
  }

  getDoctorAvatar(path: string): Observable<Blob>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append('path',path);
    return this.http.get(this.baseUrl.concat(this.docAvatarUrl),{
        responseType: 'blob',
        params: queryParams
      })
  }
}
