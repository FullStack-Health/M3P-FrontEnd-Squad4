import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CardInfoPacientesComponent } from './components/home/card-info-pacientes/card-info-pacientes.component';


export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'card-paciente', component: CardInfoPacientesComponent}
];
