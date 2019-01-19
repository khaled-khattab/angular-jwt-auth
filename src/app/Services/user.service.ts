import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'http://localhost:8000/api/user';

  constructor(private http: HttpClient) { }

  public signup(data) {
    return this.http.post(`${this.baseURL}/register`, data);
  }

  public login(data) {
    return this.http.post(`${this.baseURL}/login`, data);
  }

  public sendPasswordResetLink(data) {
    return this.http.post(`${this.baseURL}/send-password-reset-link`, data);
  }
}
