import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Paciente } from '../entities/paciente.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './authservice.service';
import { apiUrl } from '../environments/environment';

 
@Injectable({
  providedIn: 'root'
})
export class PacientesService {
 urlPath: string = `${apiUrl}/pacientes`;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) { }

  salvarPaciente(paciente: any) {
    const pacientes: any[] = this.obterPacientes();
    paciente.id = this.gerarIdSequencial(pacientes.length + 1);
    pacientes.push(paciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }

  private gerarIdSequencial(numero: number): string {
    return numero.toString().padStart(6, '0');
  }

  addPaciente(paciente: Paciente): Observable<Paciente> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<Paciente>(this.urlPath, paciente, { headers });
  };

  getPacientes(): Observable<Paciente[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<{ pacientes: Paciente[] }>(this.urlPath, { headers }).pipe(
      map(response => response.pacientes)
    );
  }

  getPacientePorId(id: string): Observable<Paciente> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Paciente>(`${this.urlPath}/${id}`, { headers });
  }

  updatePaciente(id: string, paciente: Paciente): Observable<Paciente>{
    // console.log("Paciente: " + paciente);
    const headers = this.authService.getAuthHeaders();
    return this.http.put<Paciente>(`${this.urlPath}/${id}`, paciente, { headers });
  }

  getPacientesPorNomeOuPorId(buscaInput: string): Observable<Paciente[]> {
    const headers = this.authService.getAuthHeaders();
    // console.log('getPacientesPorNomeOuPorId chamado com:', buscaInput);

    if (this.isNumeric(buscaInput)) {
      const url = `${this.urlPath}?id=${buscaInput}`;
      // console.log('URL para busca por ID:', url);
      return this.http.get<{ pacientes: Paciente[] }>(url, { headers }).pipe(
        map(response => response.pacientes)
      );
    } else {
      const url = `${this.urlPath}?nome=${buscaInput}`;
      // console.log('URL para busca por nome:', url);
      return this.http.get<{ pacientes: Paciente[] }>(url, { headers }).pipe(
        map(response => response.pacientes)
      );
    }
  }

  isNumeric(buscaInput: string) {
    return /^\d+$/.test(buscaInput);
  }

  deletarPacientes(id:string): Observable<any> {
    const headers = this.authService.getAuthHeaders();
    return this.http.delete(`${this.urlPath}/${id}`, { headers })
  }

  obterPacientes(): any[] {
    return JSON.parse(localStorage.getItem('pacientes') ?? '[]');
  }

  obterPacientePorId(id: string): any {
    const pacientes = this.obterPacientes();
    const pacienteEncontrado = pacientes.find(paciente => paciente.id === id);
    return pacienteEncontrado || null;
  }
  
  deletarPacientePorId(id: string) {
    let pacientes: any[] = this.obterPacientes();
    pacientes = pacientes.filter(paciente => paciente.id !== id);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }

  pesquisarPacientes(textoPesquisa: string): any[] {
    const pacientes = this.obterPacientes();
    return pacientes.filter(paciente =>
      paciente.nomeCompleto.toLowerCase().includes(textoPesquisa.toLowerCase()) ||
      paciente.telefone.includes(textoPesquisa) ||
      paciente.email.includes(textoPesquisa) ||
      paciente.id === textoPesquisa
    );
  }


}