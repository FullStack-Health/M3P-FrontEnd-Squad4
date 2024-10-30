// authservice.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../environments/environment';
import { LoginResponse } from '../entities/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private profiles: string[] = [];

  constructor(private readonly http: HttpClient) {}
  
  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${apiUrl}/login`, credentials);
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  setProfiles(profiles: string[]): void {
    this.profiles = profiles;
  }

  getProfiles(): string[] {
    return this.profiles;
  }

  setProfile(profile: string): void {
    this.profiles = [profile];
  }

  logout(): void {
    this.token = null;
    this.profiles = [];
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
