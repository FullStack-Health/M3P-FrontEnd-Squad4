import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuLateralComponent } from './shared/menu-lateral/menu-lateral.component';


export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuLateralComponent },
  { path: 'home', component: HomeComponent },
];
