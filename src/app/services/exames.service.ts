import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamesService {
  constructor() { }

  salvarExame(exame: any, pacienteSelecionado: any) {
    const idExame = this.gerarIdExame();
    exame.idExame = idExame; // Adiciona o idExame ao objeto de exame
    exame.nomeCompletoPaciente = pacienteSelecionado.nomeCompleto; // Adiciona o nome do paciente
    exame.idPaciente = pacienteSelecionado.id; // Adiciona o id do paciente
    let exames: any[] = this.obterExames();
    exames.push(exame);
    localStorage.setItem('exames', JSON.stringify(exames));
  }

  deletarExame(id: string) {
    let exames: any[] = this.obterExames();
    const index = exames.findIndex(exame => exame.id === id);
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

  
}