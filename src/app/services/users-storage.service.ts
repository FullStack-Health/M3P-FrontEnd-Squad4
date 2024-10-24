import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../environments/environment';
import { User } from '../entities/user.model';
import { map } from 'rxjs/operators';


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


  getUserByEmailOrById(id: string | null, email: string | null): Observable<User> {
    const headers = this.getAuthHeaders();
    let busca = new URLSearchParams();
    if (id) {
      busca.append('id', id);
    }
    if (email) {
      busca.append('email', email);
    }
    return this.http.get<User>(`${this.urlPath}/buscar?${busca.toString()}`, { headers });
  }

  getUsersByEmail(email: string): Observable<User[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<User[]>(`${this.urlPath}/busca?email=${email}`, { headers }).pipe(
          map((response: User | User[]) => {
            return Array.isArray(response) ? response : [response];
          })
        );
      }

  getUserById(id: string): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.urlPath}/busca?id=${id}`, { headers });
  }

  updateUser(id: string, user: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${apiUrl}/${id}`, user, { headers });
  }

  updatePassword(id: string, newPassword: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.urlPath}/${id}/password`, { id, newPassword }, { headers });
  }

  setProfile(profile: string): void {
    localStorage.setItem('profile', profile);
    console.log('Profile armazenado:', profile);
}


  getProfile(): string {
    return localStorage.getItem('profile') || '';
  }

  
}
