import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../environments/environment'; // Importando a URL base da API

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private urlPath = `${apiUrl}/pacientes`; // URL para acessar os endpoints do backend

  constructor(private http: HttpClient) { }

  // Alteração: Método atualizado para enviar a atualização ao backend
  atualizarPaciente(id: string, paciente: any): Observable<any> {
    return this.http.put(`${this.urlPath}/${id}`, paciente); // Envia a requisição PUT para atualizar um paciente no backend
  }

  // Alteração: Método atualizado para enviar uma requisição POST ao backend
  salvarPaciente(paciente: any): Observable<any> {
    return this.http.post(this.urlPath, paciente); // Envia a requisição POST para salvar um novo paciente
  }

  // Alteração: Método atualizado para buscar os pacientes do backend
  obterPacientes(): Observable<any[]> {
    return this.http.get<any[]>(this.urlPath); // Envia a requisição GET para obter todos os pacientes
  }

  // Alteração: Método atualizado para buscar um paciente específico pelo ID no backend
  obterPacientePorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.urlPath}/${id}`); // Envia a requisição GET para obter um paciente específico
  }

  // Adicione esta função ao seu PacientesService
  pesquisarPacientes(termo: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlPath}?search=${termo}`);
  }

  // Alteração: Método atualizado para deletar um paciente específico pelo ID no backend
  deletarPacientePorId(id: string): Observable<any> {
    return this.http.delete(`${this.urlPath}/${id}`); // Envia a requisição DELETE para remover um paciente
  }

  // Observação: Métodos locais de armazenamento removidos, pois agora todas as operações são realizadas no backend
}
