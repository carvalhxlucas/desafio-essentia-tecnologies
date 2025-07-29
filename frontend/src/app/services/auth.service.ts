import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  /** 
   * Envia os dados de registro de um novo usuário para a API.
   * @param userData Objeto com email e password do usuário.
   */
  register(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  /** 
   * Envia os dados de login do usuário para a API.
   * @param credentials Objeto com email e password do usuário.
   */
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
};
