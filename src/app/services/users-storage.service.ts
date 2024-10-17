import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  isLogged: boolean = false;

  constructor() {}

  addUser(user: any): void {
    let usersList = this.getUsers();
    user.id = this.gerarIdSequencial(usersList.length + 1);
    usersList.push(user);
    localStorage.setItem('usersList', JSON.stringify(usersList));
  }

  getUsers(): any[] {
    let usersList = localStorage.getItem('usersList');
    if (!usersList) {
      usersList = JSON.stringify([]);
      localStorage.setItem('usersList', usersList);
    }
    return JSON.parse(usersList);
  }

  private gerarIdSequencial(numero: number): string {
    return numero.toString().padStart(6, '0');
  }
  
  setLoggedUser(user: any): void {
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  getLoggedUser(): any {
    const loggedUser = localStorage.getItem('loggedUser');
      if (loggedUser){
        return JSON.parse(loggedUser);
      } else {
        localStorage.setItem('loggedUser', JSON.stringify([]));
        return [];
    }
  }

  removeLoggedUser(): void {
    localStorage.removeItem('loggedUser');
  }

  getUserByEmailOrById(textoPesquisa: string): any[] {
    let usersList = this.getUsers();
    textoPesquisa = textoPesquisa.toLowerCase();
    return usersList.filter((user: any) =>
      user.email.toLowerCase().includes(textoPesquisa) ||
      user.id.toString().includes(textoPesquisa)
    );
  }

  updatePassword(email: string, newPassword: string): boolean {
    let usersList = this.getUsers();
    const user = usersList.find((user: any) => user.email === email);

    if (user) {
      user.password = newPassword;
      localStorage.setItem('usersList', JSON.stringify(usersList));
      return true;
    } else {
      return false;
    }
  }
}
