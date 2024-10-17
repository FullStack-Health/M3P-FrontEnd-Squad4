import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserStorageService } from '../services/users-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authService: any;

  constructor(
    private readonly userService: UserStorageService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isUsuarioLogado = this.userService.getLoggedUser();
    if (isUsuarioLogado) return true;

    this.router.navigate(['/login']);
    return false;
  }
}
