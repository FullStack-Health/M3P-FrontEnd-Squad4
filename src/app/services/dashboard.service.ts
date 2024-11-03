import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private apiUrl = 'http://localhost:8080/dashboard';

  constructor(private http: HttpClient) {}

  
  getDashboardData(): Observable<any> {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Adiciona o token ao cabeçalho
    });
    
    return this.http.get<any>(this.apiUrl, { headers }); // Passa os cabeçalhos na requisição
  }
}
