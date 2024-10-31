import { Injectable } from '@angular/core';
import { apiUrl } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './authservice.service';
import { Exame } from '../entities/exame.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamesService {
  urlPath: string = `${apiUrl}/exames`;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) {}

  addExame(exame: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post(this.urlPath, exame, { headers });
  };

  getExames(): Observable<Exame[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Exame[]>(this.urlPath, { headers });
  }

  getExamePorId(id: string): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get(`${this.urlPath}/${id}`, { headers });
  }

  updateExame(id: string, exame: any): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    // console.log("Exame: " + exame);
    return this.http.put(`${this.urlPath}/${id}`, exame, { headers });
  }

  deleteExame(id: string): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete(`${this.urlPath}/${id}`, { headers });
  }

  salvarExame(exame: any, pacienteSelecionado: any) {
    const idExame = this.gerarIdExame();
    exame.idExame = idExame; 
    exame.nomeCompletoPaciente = pacienteSelecionado.nomeCompleto;
    exame.idPaciente = pacienteSelecionado.id;
    let exames: any[] = this.obterExames();
    exames.push(exame);
    localStorage.setItem('exames', JSON.stringify(exames));
  }

  deletarExame(id: string) {
    let exames: any[] = this.obterExames();
    const index = exames.findIndex(exame => exame.idExame === id);
    if (index !== -1) {
      exames.splice(index, 1); 
      localStorage.setItem('exames', JSON.stringify(exames));
    } else {
      console.error('Exame não encontrado para deletar.');
    }
  }

  gerarIdExame(): string {
    const exames = this.obterExames();
    const proximoId = exames.length + 1;
    return `E${proximoId.toString().padStart(6, '0')}`;
  }
  
  obterExames(): any[] {
    return JSON.parse(localStorage.getItem('exames') || '[]');
  }

  obterExamesPorId(idPaciente: string): any[] {
    const consultas = this.obterExames();
    return consultas.filter(consulta => consulta.idPaciente === idPaciente);
  }

  obterExamePorId(idExame: string): any {
    const exames = this.obterExames();
    return exames.find(exame => exame.idExame === idExame);
  }

  obterQuantidadeExames(): number {
    return this.obterExames().length;
  }

  atualizarExame(exameAtualizado: any) {
    let exames: any[] = this.obterExames();
    const index = exames.findIndex(exame => exame.idExame === exameAtualizado.idExame);
    if (index !== -1) {
      exames[index] = exameAtualizado;
      localStorage.setItem('exames', JSON.stringify(exames));
    } else {
      console.error('Exame não encontrado para atualizar.');
    }
  }
  
}