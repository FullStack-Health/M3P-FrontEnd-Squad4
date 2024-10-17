import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroPacientesComponent } from './components/cadastro-pacientes/cadastro-pacientes.component';
import { CadastroConsultaComponent } from './components/cadastro-consulta/cadastro-consulta.component';
import { CadastroExamesComponent } from './components/cadastro-exames/cadastro-exames.component';
import { ListagemProntuarioComponent } from './components/listagem-prontuario/listagem-prontuario.component';
import { ProntuarioPacienteComponent } from './components/prontuario-paciente/prontuario-paciente.component';
import { AuthGuard } from './guards/auth.guard';
import { ListagemUsuariosComponent } from './components/listagem-usuarios/listagem-usuarios.component';
import { EdicaoUsuariosComponent } from './components/edicao-usuarios/edicao-usuarios.component';


export const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-paciente', component: CadastroPacientesComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-paciente/:id', component: CadastroPacientesComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-consulta', component: CadastroConsultaComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-consulta/:consultaId', component: CadastroConsultaComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-exames', component: CadastroExamesComponent, canActivate: [AuthGuard] },
  { path: 'cadastro-exames/:exameId', component: CadastroExamesComponent, canActivate: [AuthGuard] },
  { path: 'prontuario-paciente', component: ProntuarioPacienteComponent, canActivate: [AuthGuard] },
  { path: 'prontuario-paciente/:id', component: ProntuarioPacienteComponent, canActivate: [AuthGuard] },
  { path: 'listagem-prontuario', component: ListagemProntuarioComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: ListagemUsuariosComponent, canActivate: [AuthGuard] },
  { path: 'usuarios/:id', component: EdicaoUsuariosComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
