import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLogged: boolean = false;

  constructor() {}

  addUser(user: any): void {
    let usersList = this.getUsers();
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
}
