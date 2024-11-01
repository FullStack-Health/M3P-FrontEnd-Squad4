import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageTitleService } from '../../services/title.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { PacientesService } from '../../services/pacientes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listagem-prontuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './listagem-prontuario.component.html',
  styleUrl: './listagem-prontuario.component.scss'
})
export class ListagemProntuarioComponent {
  
  displayedColumns: string[] = ['registro', 'nomePaciente', 'convenio', 'acao'];
  pacientes: any[] = [];
  textoPesquisa: any;

  constructor(
    private readonly pageTitleService: PageTitleService,
    private readonly pacientesService: PacientesService,
    private readonly router: Router
  ) {  
    this.pageTitleService.setPageTitle('LISTAGEM DE PRONTUÁRIO');
    this.atualizarListaPacientes();
}

atualizarListaPacientes() {
  this.pacientesService.obterPacientes().subscribe({
    next: (pacientes) => {
      this.pacientes = pacientes; // Atribui a resposta à variável this.pacientes
    },
    error: (error) => {
      console.error('Erro ao atualizar a lista de pacientes:', error); // Loga erros, se houver
    }
  });
}


pesquisarPacientes(textoPesquisa: string) {
  if (!textoPesquisa) {
    this.atualizarListaPacientes();
  } else {
    this.pacientesService.pesquisarPacientes(textoPesquisa).subscribe({
      next: (pacientes) => {
        this.pacientes = pacientes; // Atribui a resposta à variável this.pacientes
      },
      error: (error) => {
        console.error('Erro ao pesquisar pacientes:', error); // Loga erros, se houver
      }
    });
  }
}

  acessarProntuario(paciente: any) {
    this.router.navigate(['/prontuario-paciente', paciente.id]);
  }

  editarPaciente(idPaciente: string) {
    this.router.navigate(['/cadastro-paciente', idPaciente]);
  }
}
