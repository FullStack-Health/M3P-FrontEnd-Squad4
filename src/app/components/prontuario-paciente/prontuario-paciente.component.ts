import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { PageTitleService } from '../../services/title.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-prontuario-paciente',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatIcon,
  ],
  templateUrl: './prontuario-paciente.component.html',
  styleUrl: './prontuario-paciente.component.scss'
})
export class ProntuarioPacienteComponent {
  
  constructor(private pageTitleService: PageTitleService, private router: Router) {
        
    this.pageTitleService.setPageTitle('PRONTUÁRIO DE PACIENTE');
}
  
  paciente = {
    nome: 'Fulano de Tal',
    convenio: 'Unimed',
    contatoEmergencia: '(99) 99999-9999',
    alergias: 'Penicilina',
    cuidadosEspecificos: 'Nenhum'
  };
  

  colunasConsultas: string[] = ['data', 'hora', 'motivo', 'editar'];
  
  consultas = [
    { data: '01/01/2022', hora: '09:00', motivo: 'Dor de cabeça' },
    { data: '15/02/2022', hora: '10:30', motivo: 'Febre alta' }
  ];

  editarConsulta(consulta: any) {
    // Implemente a lógica de edição da consulta aqui
    console.log('Editar consulta:', consulta);
    this.router.navigate(['/cadastro-paciente'])
  }

  
  colunasExames: string[] = ['data', 'hora', 'nome', 'laboratorio', 'editar'];
  
  exames = [
    { data: '05/03/2022', hora: '08:00', nome: 'Hemograma', laboratorio: 'Lab ABC' },
    { data: '20/04/2022', hora: '11:00', nome: 'Ultrassom', laboratorio: 'Lab XYZ' }
  ];
  
  editarExame(exame: any) {
    // Implemente a lógica de edição do exame aqui
    console.log('Editar exame:', exame);
  }
  

}
