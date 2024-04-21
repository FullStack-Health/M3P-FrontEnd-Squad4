import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CadastroPacientesComponent } from './components/cadastro-pacientes/cadastro-pacientes.component';
import { CadastroConsultaComponent } from './components/cadastro-consulta/cadastro-consulta.component';
import { CadastroExamesComponent } from './components/cadastro-exames/cadastro-exames.component';
import { ListagemProntuarioComponent } from './components/listagem-prontuario/listagem-prontuario.component';
import { ProntuarioPacienteComponent } from './components/prontuario-paciente/prontuario-paciente.component';


export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro-paciente', component: CadastroPacientesComponent},
  { path: 'cadastro-paciente/:id', component: CadastroPacientesComponent },
  { path: 'cadastro-consulta', component: CadastroConsultaComponent},
  { path: 'cadastro-consulta/:consultaId', component: CadastroConsultaComponent },
  { path: 'cadastro-exames', component: CadastroExamesComponent},
  { path: 'cadastro-exames/:exameId', component: CadastroExamesComponent },
  { path: 'prontuario-paciente', component: ProntuarioPacienteComponent },
  { path: 'prontuario-paciente/:id', component: ProntuarioPacienteComponent },
  { path: 'listagem-prontuario', component: ListagemProntuarioComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];
