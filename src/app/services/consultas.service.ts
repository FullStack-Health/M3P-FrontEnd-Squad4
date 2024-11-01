import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../environments/environment';
import { AuthService } from './authservice.service';
import { map, Observable } from 'rxjs';
import { Consulta } from '../entities/consulta.model';

@Injectable({
  providedIn: 'root',
})
export class ConsultasService {
  urlPath: string = `${apiUrl}/consultas`;
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  salvarConsulta(consulta: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post(this.urlPath, consulta, { headers });
  }

  obterConsultas(): Observable<Consulta[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Consulta[]>(this.urlPath, { headers });
  }

  obterConsultasPorId(idPaciente: string): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get(`${this.urlPath}/${idPaciente}`, { headers });
  }

  obterConsultaPorId(idConsulta: string): any {
    const headers = this.authService.getAuthHeaders();
    return this.http.get(`${this.urlPath}/${idConsulta}`, { headers });
  }

  obterQuantidadeConsultas(): Observable<number> {
    const headers = this.authService.getAuthHeaders();
    const quantidadeConsultas = this.http.get<Consulta[]>(this.urlPath, { headers }).pipe(
      map((listaConsultas: Consulta[]) => listaConsultas.length)
    );
    return quantidadeConsultas;
  
  }

  deletarConsulta(id: string): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete(`${this.urlPath}/${id}`, { headers });
    }

  atualizarConsulta(id: string, consulta: any) {
    const headers = this.authService.getAuthHeaders();
    return this.http.put(`${this.urlPath}/${id}`, consulta, { headers });
  }
}
