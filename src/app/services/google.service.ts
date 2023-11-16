import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  url = environment.url;
  private api_Get_Url = `${this.url}/api/google/login/url`;
  private api_Url_Login_Register = `${this.url}/api/google/auth/login`;


  constructor(private http: HttpClient) {


  }


  getAuthUrl(): Observable<string> {
    return this.http.get<string>(this.api_Get_Url);
  }

  Login_Google(auth_code: string) {
    const url = ` ${this.api_Url_Login_Register}?auth_code=${auth_code}`;

    const body = { auth_code };
    return this.http.post(url, auth_code);
  }



}
