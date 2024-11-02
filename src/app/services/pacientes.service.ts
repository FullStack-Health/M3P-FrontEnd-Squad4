import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../environments/environment'; // Importando a URL base da API
import { UserStorageService } from './users-storage.service';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private urlPath = `${apiUrl}/pacientes`; // URL para acessar os endpoints do backend

  constructor(private http: HttpClient, private userService: UserStorageService) { }

  // Alteração: Método atualizado para enviar a atualização ao backend
  atualizarPaciente(id: string, paciente: any): Observable<any> {
    const headers = this.userService.getAuthHeaders(); // Obtém os cabeçalhos de autenticação
    return this.http.put(`${this.urlPath}/${id}`, paciente); // Envia a requisição PUT para atualizar um paciente no backend
  }

  // Alteração: Método atualizado para enviar uma requisição POST ao backend
  salvarPaciente(paciente: any): Observable<any> {
    const headers = this.userService.getAuthHeaders(); // Utilize o método para obter os headers
    console.log('Paciente a ser enviado:', paciente);
    console.log('Headers:', headers);
    return this.http.post(this.urlPath, paciente, { headers }).pipe(
      tap(response => console.log('Paciente salvo com sucesso:', response)),
      catchError(this.handleError) // Tratamento de erros
    );
  }

  // Alteração: Método atualizado para buscar os pacientes do backend
  obterPacientes(): Observable<any[]> {
    const headers = this.userService.getAuthHeaders(); // Obtém os cabeçalhos de autenticação
    return this.http.get<any[]>(this.urlPath); // Envia a requisição GET para obter todos os pacientes
  }

  // Alteração: Método atualizado para buscar um paciente específico pelo ID no backend
  obterPacientePorId(id: string): Observable<any> {
    const headers = this.userService.getAuthHeaders(); // Obtém os cabeçalhos de autenticação
    return this.http.get<any>(`${this.urlPath}/${id}`); // Envia a requisição GET para obter um paciente específico
  }

  // Adicione esta função ao seu PacientesService
  pesquisarPacientes(termo: string): Observable<any[]> {
    const headers = this.userService.getAuthHeaders(); // Obtém os cabeçalhos de autenticação
    return this.http.get<any[]>(`${this.urlPath}?search=${termo}`);
  }

  // Alteração: Método atualizado para deletar um paciente específico pelo ID no backend
  deletarPacientePorId(id: string): Observable<any> {
    const headers = this.userService.getAuthHeaders(); // Obtém os cabeçalhos de autenticação
    return this.http.delete(`${this.urlPath}/${id}`); // Envia a requisição DELETE para remover um paciente
  }
  // Observação: Métodos locais de armazenamento removidos, pois agora todas as operações são realizadas no backend

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Detalhes do erro:', error);
    if (error.error instanceof ErrorEvent) {
      // Erros do lado do cliente ou de rede
      console.error('Erro do lado do cliente:', error.error.message);
    } else {
      // Erros retornados pelo backend
      console.error(
        `Backend retornou o código ${error.status}, ` +
        `corpo do erro: ${JSON.stringify(error.error)}`
      );
    }
    return throwError(() => new Error('Ocorreu um erro ao processar a requisição. Verifique os detalhes e tente novamente.'));
  }
  
}

