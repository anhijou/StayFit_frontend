import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  port = environment.port;
  url = environment.url;

  private API_URL_Workout_categories = `${this.url}/api/client/workouts/categories`;// Base URL for API endpoints user
  private API_URL_Workout_categoriById = `${this.url}/api/client/goals/getworkouts`;// Base URL for API endpoints user
  private API_URL_Workout_By_Id = `${this.url}/api/client/workouts`;// Base URL for API endpoints user
  private api_url_allworkout = `${this.url}/api/workouts`;

  constructor(private http: HttpClient) { }

  GetallWorkout(): Observable<any> {
    const token = localStorage.getItem('token');

    const url = `${this.api_url_allworkout}`; // Endpoint URL for login
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


  GetWorkoutCategorys(): Observable<any> {
    const token = localStorage.getItem('token');

    const url = `${this.API_URL_Workout_categories}`; // Endpoint URL for login
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
  GetWorkoutCategoryById(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    const url = `${this.API_URL_Workout_categoriById}/${id}`; // Endpoint URL for login
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

  GetWorkoutById(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    const url = `${this.API_URL_Workout_By_Id}/${id}`; // Endpoint URL for login
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

}
