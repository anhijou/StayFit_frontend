import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetDataUser } from 'src/interfaces/GetDataUser.interface';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  alldata !: GetDataUser;
  token !: string;
  port = environment.port;
  url = environment.url;
  private API_URL_USER = `${this.url}/api/client/users`;
  constructor(private http: HttpClient) {
    this.GetName();

  }


  async GetName() {
    await this.GetData().subscribe((response: GetDataUser) => {
      this.alldata = response.data;
    });
  }

  GetData(): Observable<GetDataUser> {
    const token = localStorage.getItem('token');
    const url = `${this.API_URL_USER}`; // Endpoint URL for login
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // Send Get request to the API
      return this.http.get<GetDataUser>(url, { headers });
    } else {
      // Handle the case when the token is not available
      // For example, redirect to the login page
      return throwError('Token not available');
    }
  }



}
