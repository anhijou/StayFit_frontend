import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoCallTokenService {
  port = environment.port;
  url = environment.url;


  private API_URL = `${this.url}/api/video-call/start1`;
  private API_URL_getchannel = `${this.url}/api/videocallinfo`;
  private API_URL_getworkout = `${this.url}/api/video-call/updateworkout`;

  constructor(private http: HttpClient) { }

  GetData(): Observable<any> {
    const token = localStorage.getItem('token');
    const url = `${this.API_URL_getchannel}`; // Endpoint URL for login
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // Send Get request to the API
      return this.http.get<any>(url, { headers });
    } else {
      // Handle the case when the token is not available
      // For example, redirect to the login page
      return throwError('Token not available');
    }
  }
  CreateRoom(receiver_email: string) {
    const token = localStorage.getItem('token');
    const caller_id = localStorage.getItem('iduser');
    const url = `${this.API_URL}`; // Endpoint URL for login
    const body = { receiver_email, caller_id }; // Request body containing login credentials
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(url, body, { headers }); // Send POST request to the API
  }

  deleteroomFromDatabase() {
    const token = localStorage.getItem('token');
    const caller_id = localStorage.getItem('iduser');
    const url = `${this.API_URL_getchannel}/${caller_id}`; // Endpoint URL for login
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(url, { headers }); // Send POST request to the API
  }


  changeOrChoseWorkout(workout_id: number) {
    const token = localStorage.getItem('token');
    const caller_id = localStorage.getItem('iduser');

    const url = `${this.API_URL_getworkout}`; // Endpoint URL for login
    const body = { workout_id, caller_id }; // Request body containing login credentials
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(url, body, { headers }); // Send POST request to the API
  }



}
