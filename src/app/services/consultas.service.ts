import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor() { }

  salvarConsulta(consulta: any, pacienteSelecionado: any) {
    const idConsulta = this.gerarIdConsulta();
    consulta.idConsulta = idConsulta; // Adiciona o idConsulta ao objeto de consulta
    consulta.nomeCompletoPaciente = pacienteSelecionado.nomeCompleto; // Adiciona o nome do paciente
    consulta.idPaciente = pacienteSelecionado.id; // Adiciona o id do paciente
    let consultas: any[] = this.obterConsultas();
    consultas.push(consulta);
    localStorage.setItem('consultas', JSON.stringify(consultas));
  }

  deletarConsulta(id: string) {
    let consultas: any[] = this.obterConsultas();
    const index = consultas.findIndex(consulta => consulta.id === id);
    if (index !== -1) {
      consultas.splice(index, 1); 
      localStorage.setItem('consultas', JSON.stringify(consultas));
    } else {
      console.error('Consulta não encontrada para deletar.');
    }
  }

  gerarIdConsulta(): string {
    const consultas = this.obterConsultas();
    const proximoId = consultas.length + 1;
    return `C${proximoId.toString().padStart(6, '0')}`;
  }
  
  obterConsultas(): any[] {
    return JSON.parse(localStorage.getItem('consultas') || '[]');
  }

  obterConsultasPorId(idPaciente: string): any[] {
    const consultas = this.obterConsultas();
    return consultas.filter(consulta => consulta.idPaciente === idPaciente);
  }
  
  obterQuantidadeConsultas(): number {
    return this.obterConsultas().length;
  }
  
}

