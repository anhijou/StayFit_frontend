import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  port = environment.port;
  url = environment.url;
  private API_URL_meals = `${this.url}/api/client/goals/getallmeals`;// Base URL for API endpoints user
  private API_URL_mealsByCategoryId = `${this.url}/api/client/goals/getmeals`;// Base URL for API endpoints user
  private API_URL_mealsById = `${this.url}/api/client/meals`;// Base URL for API endpoints user
  private API_URL_getcategorybyId = `${this.url}/api/client/meals/categorypage`;



  constructor(private http: HttpClient) { }



  Getmeals(): Observable<any> {
    const token = localStorage.getItem('token');

    const url = `${this.API_URL_meals}`; // Endpoint URL for login
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


  GetmealsByCategoryId(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    const url = `${this.API_URL_mealsByCategoryId}/${id}`; // Endpoint URL for login
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

  GetmealsById(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    const url = `${this.API_URL_mealsById}/${id}`; // Endpoint URL for login
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


  GetcategoryById(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    const url = `${this.API_URL_getcategorybyId}/${id}`; // Endpoint URL for login
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
