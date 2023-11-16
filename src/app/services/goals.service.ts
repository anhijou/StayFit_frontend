import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  url = environment.url;
  port = environment.port;
  private API_url_goals = `${this.url}/api/client/goals`;

  constructor(private http: HttpClient) { }




  getGoals(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.API_url_goals, { headers });
  }
}
