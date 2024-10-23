import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../environments/environment';
import { User } from '../entities/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  isLogged: boolean = false;
  token: string | null = null;

  constructor(private readonly http: HttpClient) {}

  urlPath: string = `${apiUrl}/usuarios`;

  setToken(token: string): void {
    this.token = token;
    // console.log('Token salvo:', token);
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if(!this.token) {
      this.token = localStorage.getItem('token');
    }
    console.log('Token recuperado:', this.token);
    return this.token;
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if(token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    } else {
      console.error('Nenhum token encontrado!');
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
  }

  addUser(user: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.urlPath}/pre-registro`, user, { headers });
  };

  getUsers(): Observable<User[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<User[]>(this.urlPath, { headers });
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

  getUserByEmailOrById(textoPesquisa: string): Observable<any []> {
    return this.http.get<any[]>(`${this.urlPath}/${textoPesquisa}`);
  }

  updateUser(id: string, user: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${apiUrl}/${id}`, user, { headers });
  }

  updatePassword(id: string, newPassword: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.urlPath}/${id}/password`, { id, newPassword }, { headers });
  }
  
  // DEPRACATED
  // updatePassword(email: string, newPassword: string): boolean {
  //   let usersList = this.getUsers();
  //   const user = usersList.find((user: any) => user.email === email);
  //   if (user) {
  //     user.password = newPassword;
  //     localStorage.setItem('usersList', JSON.stringify(usersList));
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // DEPRECATED 
  // updateUser(id: string, user: any) {
  //   const usersList: any[] = this.getUsers();
  //   const index = usersList.findIndex((user) => user.id === id);
  //   if (index !== -1) {
  //     usersList[index] = { ...user, id: id };
  //     localStorage.setItem('usersList', JSON.stringify(usersList));
  //   } else {
  //     console.error('Usuário não encontrado com o ID: ', id);
  //   }
  // }

    // DEPRECATED > addUsers() via localStorage
  // addUser(user: any): void {
  //   let usersList: any[] = this.getUsers();
  //   user.id = this.gerarIdSequencial(usersList.length + 1);
  //   usersList.push(user);
  //   localStorage.setItem('usersList', JSON.stringify(usersList));
  // }

  // DEPRECATED > getUsers() via localStorage
  // getUsers(): any[] {
  //   let usersList = localStorage.getItem('usersList');
  //   if (!usersList) {
  //     usersList = JSON.stringify([]);
  //     localStorage.setItem('usersList', usersList);
  //   }
  //   return JSON.parse(usersList);
  // }

  // DEPRECATED > Id vai ser gerado no Back-End
  // private gerarIdSequencial(numero: number): string {
  //   return numero.toString().padStart(6, '0');
  // }

  // DEPRECATED
  // getUserByEmailOrById(textoPesquisa: string): any[] {
  //   let usersList = this.getUsers();
  //   textoPesquisa = textoPesquisa.toLowerCase();
  //   return usersList.filter(
  //     (user: any) =>
  //       user.email.toLowerCase().includes(textoPesquisa) ||
  //       user.id.toString().includes(textoPesquisa)
  //   );
  // }

  // DEPRECATED
  // removeUser(userId: string): void {
  //   let usersList: any[] = this.getUsers();
  //   usersList = usersList.filter((user) => user.id !== userId);
  //   localStorage.setItem('usersList', JSON.stringify(usersList));
  // }

}
