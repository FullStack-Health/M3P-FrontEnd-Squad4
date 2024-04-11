import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MenuLateralComponent } from "./shared/menu-lateral/menu-lateral.component";
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatList, MatListModule, MatNavList } from '@angular/material/list';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
      RouterOutlet,
      MenuLateralComponent,
      RouterLink,
      RouterOutlet,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      MatSidenavModule,
      MatNavList,
      MatList, 
    ]
})
export class AppComponent {
  title = 'LABMedical';


  logout(){

  }
}
