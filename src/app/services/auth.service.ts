import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { registerdata } from 'src/interfaces/registerdata';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  port = environment.port;
  url = environment.url;
  private API_URL = `${this.url}/api/auth`;  // Base URL for API endpoints
  constructor(private http: HttpClient) { }

  // Function to register a new user
  register(registerdta: registerdata) {
    const url = `${this.API_URL}/register`; // Endpoint URL for registration
    const body = { registerdta }; // Request body containing user data
    return this.http.post(url, registerdta); // Send POST request to the API
  }

  // Function to log in a user
  login(email: string, password: string) {
    const url = `${this.API_URL}/login`; // Endpoint URL for login
    const body = { email, password }; // Request body containing login credentials
    return this.http.post(url, body); // Send POST request to the API
  }

  // Function to log out a user
  logout() {
    // Remove the token from local storage
    localStorage.removeItem('token');
    localStorage.clear();
  }
}