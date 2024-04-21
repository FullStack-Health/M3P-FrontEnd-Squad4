import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor() { }

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
    const pacienteEncontrado = pacientes.find(paciente => paciente.id === id);
    return pacienteEncontrado ? pacienteEncontrado : null;
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