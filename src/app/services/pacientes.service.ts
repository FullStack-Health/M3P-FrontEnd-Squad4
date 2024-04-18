import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor() { }

  salvarPaciente(paciente: any) {
    const pacientes: any[] = this.obterPacientes();
    paciente.id = this.gerarIdSequencial(pacientes.length + 1);
    pacientes.push(paciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }

  private gerarIdSequencial(numero: number): string {
    return numero.toString().padStart(6, '0');
  }

  obterPacientes(): any[] {
    return JSON.parse(localStorage.getItem('pacientes') || '[]');
  }

  obterPacientePorId(id: string): any {
    const pacientes = this.obterPacientes();
    return pacientes.find(paciente => paciente.id === id);
  }

  deletarPacientes() {
    localStorage.removeItem('pacientes');
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