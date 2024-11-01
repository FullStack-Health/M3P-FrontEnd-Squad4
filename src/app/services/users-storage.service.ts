import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { apiUrl } from '../environments/environment';
import { User } from '../entities/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  isLogged: boolean = false;
  token: string | null = null;
  private profile: string | undefined;

  constructor(private readonly http: HttpClient) {}

  urlPath: string = `${apiUrl}/usuarios`;

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
    console.log('Token armazenado:', token); // Log para depuração
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    console.log('Token recuperado:', this.token); // Log para verificar o token
    return this.token;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      console.log('Token válido encontrado. Configurando cabeçalhos.');
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    } else {
      console.error('Nenhum token encontrado! Requisições podem falhar sem autenticação.');
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }

  // `getAuthHeaders` em uma requisição com tratamento de erros
  getUsers(): Observable<User[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<User[]>(this.urlPath, { headers }).pipe(
      catchError(this.handleError) // Adicionando tratamento de erro para depuração
    );
  }

  // Método para tratamento de erros
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Erro na requisição:', error);
    return throwError(() => new Error('Ocorreu um erro ao processar a requisição. Tente novamente mais tarde.'));
  }

  addUser(user: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.urlPath}/pre-registro`, user, { headers }).pipe(
      catchError(this.handleError) // Tratamento de erros adicionado
    );
  }  

  setLoggedUser(user: any): void {
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  getLoggedUser(): any {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      return JSON.parse(loggedUser);
    } else {
      localStorage.setItem('loggedUser', JSON.stringify([]));
      return [];
    }
  }

  removeLoggedUser(): void {
    localStorage.removeItem('loggedUser');
  }

  removeUser(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.urlPath}/${id}`, { headers });
  }

  getUsersByEmailOrById(buscaInput: string) {
    const headers = this.getAuthHeaders();

    if (this.isNumeric(buscaInput)) {
      return this.http.get<User>(`${this.urlPath}?id=${buscaInput}`, { headers });
    } else {
      return this.http.get<User>(`${this.urlPath}?email=${buscaInput}`, { headers });
    }
  }

  isNumeric(buscaInput: string) {
    return /^\d+$/.test(buscaInput);
  }

  searchUserById(id: string): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.urlPath}?id=${id}`, { headers });
  }

  getUserById(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.urlPath}/${id}`;
    return this.http.get(url, { headers });
  }

  updateUser(id: string, user: any): Observable<any> {
    const headers = this.getAuthHeaders();
    console.log("Usuário: " + user);
    return this.http.put(`${this.urlPath}/${id}`, user, { headers });
  }

  updatePassword(email: string, password: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { email, password };
    const url = `${this.urlPath}/email/${email}/redefinir-senha`;
    console.log('URL:', url); // Log para depuração
    console.log('Corpo da requisição:', body); // Log para depuração
    return this.http.patch(`${this.urlPath}/email/${email}/redefinir-senha`, { password }, { headers });
  }

  setProfile(profile: string): void {
    this.profile = profile;
    localStorage.setItem('profile', profile);
    console.log('Profile armazenado:', profile);
}

  getProfile(): string {
    if (!this.profile) {
      this.profile = localStorage.getItem('profile') || '';
    }
    return this.profile;
  }  
}
