import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { progress } from 'src/interfaces/progress.interface';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  url = environment.url;
  port = environment.port;

  private API_URL = `${this.url}/api/client/progress`;


  constructor(private http: HttpClient) { }


  ProgressAdd(progressdata: progress) {
    const url = `${this.API_URL}`;
    const token = localStorage.getItem('token');
    const body = { progressdata }; // Request body containing login credentials
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send post request to the API
    return this.http.post(url, progressdata, { headers });
  }



  GetAll(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.API_URL, { headers });
  }
}
