import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatList, MatNavList } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { UserStorageService } from '../../services/users-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatNavList,
    MatList,
    MatDividerModule,
  ],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.scss',
})
export class MenuLateralComponent {
  constructor(
    private userService: UserStorageService,
    private router: Router
  ) {}

  removeLoggedUser(): void {
    this.userService.removeLoggedUser();
    this.router.navigate(['/login']);
  }
}
