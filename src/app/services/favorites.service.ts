import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  url = environment.url;
  port = environment.port;
  private API_URL_Get_Favorites = `${this.url}/api/client/workouts/favorites`;
  private API_URL_DeleteAndPost_Favorite = `${this.url}/api/client/workouts/favorite`;


  constructor(private http: HttpClient) { }

  GetFavorites(): Observable<any> {
    const token = localStorage.getItem('token');

    const url = `${this.API_URL_Get_Favorites}`; // Endpoint URL for login
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

  deleteFavoritesApi(id: number) {
    const token = localStorage.getItem('token');

    const url = `${this.API_URL_DeleteAndPost_Favorite}/${id}`;
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // Send Get request to the API
      return this.http.delete<any>(url, { headers });
    } else {
      // Handle the case when the token is not available
      // For example, redirect to the login page
      return throwError('Token not available');
    }

  }

  addFavoritesApi(id: number) {
    const token = localStorage.getItem('token');

    const url = `${this.API_URL_DeleteAndPost_Favorite}/${id}`;
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // Send Get request to the API

      const body = {}; // Modify this to include the required payload

      // Send POST request to the API
      return this.http.post(url, body, { headers });
    } else {
      // Handle the case when the token is not available
      // For example, redirect to the login page
      return throwError('Token not available');
    }

  }
}

