import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  port = environment.port;
  url = environment.url;

  private API_URL = `${this.url}/api/auth/password/forgot`;
  constructor(private http: HttpClient) { }


  forgetpassword(email: string) {
    const url = `${this.API_URL}`;
    const body = { email: email };
    // Send Post for recive mail in your email request to the API
    return this.http.post(url, body);
  }
}
