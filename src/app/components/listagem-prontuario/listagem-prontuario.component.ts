import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageTitleService } from '../../services/title.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-listagem-prontuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule
  ],
  templateUrl: './listagem-prontuario.component.html',
  styleUrl: './listagem-prontuario.component.scss'
})
export class ListagemProntuarioComponent {

  constructor(private pageTitleService: PageTitleService) {
        
    this.pageTitleService.setPageTitle('LISTAGEM DE PRONTUÁRIO');
}

displayedColumns: string[] = ['registro', 'nomePaciente', 'convenio', 'acao'];

pacientes: any[] = [
  { registro: '000001', nomePaciente: 'André Junckes da Silva Mattos', convenio: 'Unimed' },
  { registro: '000002', nomePaciente: 'Maria da Silva', convenio: 'Amil' },
  { registro: '000003', nomePaciente: 'João Santos', convenio: 'SulAmérica' }
  // Adicione quantos pacientes desejar
];


  pesquisarPacientes() {

  }

  acessarProntuario(paciente: any) {

  }

}
