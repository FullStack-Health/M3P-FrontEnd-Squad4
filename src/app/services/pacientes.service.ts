import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor() { }

  atualizarPaciente(id: string, paciente: any): void {
    const pacientes: any[] = this.obterPacientes();
    const indice = pacientes.findIndex(p => p.id === id);

    if (indice !== -1) {
      pacientes[indice] = { ...paciente, id };
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

  salvarPaciente(paciente: any): void {
    const pacientes: any[] = this.obterPacientes();
    paciente.id = this.gerarIdSequencial(pacientes.length + 1);
    pacientes.push(paciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }

  private gerarIdSequencial(numero: number): string {
    return numero.toString().padStart(6, '0');
  }

  obterPacientes(): any[] {
    return JSON.parse(localStorage.getItem('pacientes') ?? '[]');
  }

  obterPacientePorId(id: string): any | null {
    const pacientes = this.obterPacientes();
    return pacientes.find(paciente => paciente.id === id) || null;
  }

  deletarPacientePorId(id: string): void {
    let pacientes: any[] = this.obterPacientes();
    pacientes = pacientes.filter(paciente => paciente.id !== id);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }

  deletarPacientes(): void {
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