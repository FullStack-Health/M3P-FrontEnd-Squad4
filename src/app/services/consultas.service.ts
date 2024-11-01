import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< Updated upstream
import { AuthService } from './authservice.service';
import { UserStorageService } from './users-storage.service';
import { apiUrl } from '../environments/environment';
import { Observable } from 'rxjs';
=======
import { apiUrl } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './authservice.service';
import { map, Observable } from 'rxjs';
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
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
