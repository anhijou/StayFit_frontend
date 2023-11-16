import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userData } from 'src/interfaces/userData';
import { GetDataUser } from 'src/interfaces/GetDataUser.interface';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FormService {

  iduser !: number;

  port = environment.port;
  url = environment.url;
  private API_URL = `${this.url}/api/users/update`;
  private API_url_edit = `${this.url}/api/client/users`;


  tokenuser !: string;

  constructor(private http: HttpClient) { }



  // Function to Update data in user table for the first time registration
  formupdate(userData: Partial<userData>) {
    const url = `${this.API_url_edit}`;
    const token = localStorage.getItem('token');
    // const url = `${this.API_URL}/${this.iduser}`; // Endpoint URL for login
    const body = { userData }; // Request body containing login credentials
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Send Put request to the API
    return this.http.put(url, userData, { headers });
  }


  editprofile(editprofiledata: GetDataUser): Observable<GetDataUser> {

    const token = localStorage.getItem('token');
    const iduser = localStorage.getItem('iduser');
    // const url = `${this.API_URL}/${this.iduser}`;
    const url = `${this.API_url_edit}`;
    // const url = `${this.API_URL}/${iduser}`; // Endpoint URL for login
    const body = { editprofiledata }; // Request body containing login credentials
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      // Send Put request to the API
      return this.http.put<GetDataUser>(url, editprofiledata, { headers });
    }
    else {
      // Handle the case when the token is not available
      // For example, redirect to the login page
      return throwError('Token not available');
    }
  }


}
