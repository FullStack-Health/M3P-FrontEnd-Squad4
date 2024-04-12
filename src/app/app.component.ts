import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MenuLateralComponent } from "./shared/menu-lateral/menu-lateral.component";
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatList, MatListModule, MatNavList } from '@angular/material/list';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';

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
      MatIconModule,
      MatButtonModule,
      MatSidenavModule,
      MatNavList,
      MatList,
      ToolbarComponent ,
    ]
})
export class AppComponent {
  title = 'LABMedical';


  logout(){

  }
}
