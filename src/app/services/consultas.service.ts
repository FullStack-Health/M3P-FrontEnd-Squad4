import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './authservice.service';
import { UserStorageService } from './users-storage.service';
import { apiUrl } from '../environments/environment';
import { Observable } from 'rxjs';
import { Consulta } from '../entities/consulta.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

//  private apiUrl = 'http://localhost:8081/consultas'
urlPath: string = `${apiUrl}/consultas`;
  
constructor(private http: HttpClient,
              private authService: AuthService,
              private userService: UserStorageService
  ) { }


  cadastrarConsulta(consulta: Consulta): Observable<Consulta> {
    // const consultas = this.obterConsultas();
    const headers = this.userService.getAuthHeaders();
    // console.log(this.http.post<Consulta>('${this.urlPath}', { headers }))
    return this.http.post<Consulta>('${this.urlPath}', { headers });
                    
  }

  // salvarConsulta(consulta: any, pacienteSelecionado: any) {
  //   consulta.nomeCompletoPaciente = pacienteSelecionado.nomeCompleto; // Adiciona o nome do paciente
  //   consulta.idPaciente = pacienteSelecionado.id; // Adiciona o id do paciente
  //   let consultas: any[] = this.obterConsultas();
  //   consultas.push(consulta);
  //   localStorage.setItem('consultas', JSON.stringify(consultas));
  // }
  // gerarIdConsulta(): string {
  //   const consultas = this.obterConsultas();
  //   const proximoId = consultas.length + 1;
  //   return `C${proximoId.toString().padStart(6, '0')}`;
  // }
  
  obterConsultas(): any[] {
    return JSON.parse(localStorage.getItem('consultas') || '[]');
  }

  // obterConsultasPorId(idPaciente: string): any[] {
  //   const consultas = this.obterConsultas();
  //   return consultas.filter(consulta => consulta.idPaciente === idPaciente);
  // }

  obterConsultaPorId(idConsulta: string): Observable<Consulta> {
    // const consultas = this.obterConsultas();
    const headers = this.userService.getAuthHeaders();
    return this.http.get<Consulta>('${this.urlPath}/${id}', { headers });
                    
  }
  
  obterQuantidadeConsultas(): number {
    return this.obterConsultas().length;
  }

  deletarConsulta(id: string) {
    let consultas: any[] = this.obterConsultas();
    const index = consultas.findIndex(consulta => consulta.idConsulta === id);
    if (index !== -1) {
      consultas.splice(index, 1); 
      localStorage.setItem('consultas', JSON.stringify(consultas));
    } else {
      console.error('Consulta não encontrada para deletar.');
    }
  }

  atualizarConsulta(consultaAtualizada: any) {
    let consultas: any[] = this.obterConsultas();
    const index = consultas.findIndex(consulta => consulta.idConsulta === consultaAtualizada.idConsulta);
    if (index !== -1) {
      consultas[index] = consultaAtualizada;
      localStorage.setItem('exames', JSON.stringify(consultas));
    } else {
      console.error('Exame não encontrado para atualizar.');
    }
  }
  
}

