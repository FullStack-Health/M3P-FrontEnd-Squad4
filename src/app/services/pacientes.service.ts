import { Injectable } from '@angular/core';
import { AuthService } from './authservice.service';
import { map, Observable } from 'rxjs';
import { Paciente } from '../entities/paciente.model';
import { HttpClient } from '@angular/common/http';
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

  atualizarPaciente(id: string, paciente: any) {
    const pacientes: any[] = this.obterPacientes();
    const indice = pacientes.findIndex(paciente => paciente.id === id);

    if (indice !== -1) {
      pacientes[indice] = { ...paciente, id: id };
      localStorage.setItem('pacientes', JSON.stringify(pacientes));
    } else {
      console.error('Paciente não encontrado com o ID fornecido:', id);
    }
  }

  // atualizarPaciente(pacienteAtualizado: any) {
  //   let pacientes: any[] = this.obterPacientes();
  //   const index = pacientes.findIndex(paciente => paciente.idPaciente === pacienteAtualizado.idPaciente);
  //   if (index !== -1) {
  //     pacientes[index] = pacienteAtualizado;
  //     localStorage.setItem('pacientes', JSON.stringify(pacientes));
  //   } else {
  //     console.error('Paciente não encontrado para atualizar.');
  //   }
  // }

  salvarPaciente(paciente: any) {
    const pacientes: any[] = this.obterPacientes();
    paciente.id = this.gerarIdSequencial(pacientes.length + 1);
    pacientes.push(paciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }

  private gerarIdSequencial(numero: number): string {
    return numero.toString().padStart(6, '0');
  }

  getPacientes(): Observable<Paciente[]> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<{ pacientes: Paciente[] }>(this.urlPath, { headers }).pipe(
      map(response => response.pacientes)
    );
  }

  getPacientePorId(id: string): Observable<Paciente> {
    const headers = this.authService.getAuthHeaders();
    return this.http.get<Paciente>(this.urlPath, { headers });
  }

  obterPacientes(): any[] {
    return JSON.parse(localStorage.getItem('pacientes') ?? '[]');
  }

  obterPacientePorId(id: string): any {
    const pacientes = this.obterPacientes();
    const pacienteEncontrado = pacientes.find(paciente => paciente.id === id);
    return pacienteEncontrado || null;
  }
  
  deletarPacientes() {
    localStorage.removeItem('pacientes');
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