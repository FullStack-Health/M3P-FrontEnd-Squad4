import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../environments/environment';
import { AuthService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  // private apiUrl = 'http://localhost:8081/dashboard';

  private urlPath: string = `${apiUrl}/dashboard`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getDashboardData(): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    
    return this.http.get<any>(this.urlPath, { headers });
  }
}
