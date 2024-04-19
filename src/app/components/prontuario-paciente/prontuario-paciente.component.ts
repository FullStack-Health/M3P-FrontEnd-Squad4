import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PageTitleService } from '../../services/title.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PacientesService } from '../../services/pacientes.service';
import { CommonModule } from '@angular/common';
import { ConsultasService } from '../../services/consultas.service';
import { ExamesService } from '../../services/exames.service';

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
    CommonModule
  ],
  templateUrl: './prontuario-paciente.component.html',
  styleUrl: './prontuario-paciente.component.scss'
})
export class ProntuarioPacienteComponent {
  paciente: any;
  consultas: any[] = [];
  exames: any[] = [];
  // dataSource: MatTableDataSource<any> | undefined; // Declare a propriedade dataSource

  constructor(
    private pageTitleService: PageTitleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pacientesService: PacientesService,
    private consultasService: ConsultasService,
    private examesService: ExamesService,
  ) {
        
    this.pageTitleService.setPageTitle('PRONTUÁRIO DE PACIENTE');
}
  

ngOnInit(): void {
  // Obter o ID do paciente da rota
  this.activatedRoute.params.subscribe(params => {
    const pacienteId = params['id'];
    // Obter os dados do paciente com base no ID
    this.paciente = this.pacientesService.obterPacientePorId(pacienteId);
    this.consultas = this.consultasService.obterConsultasPorId(pacienteId);
    this.exames = this.examesService.obterExamesPorId(pacienteId);
    // this.dataSource = new MatTableDataSource(this.consultas); 
    console.log(this.consultas);
    console.log(this.exames)
  });
}

// paciente = {
  //   nome: 'Fulano de Tal',
  //   convenio: 'Unimed',
  //   contatoEmergencia: '(99) 99999-9999',
  //   alergias: 'Penicilina',
  //   cuidadosEspecificos: 'Nenhum'
  // };
  
  
  colunasConsultas: string[] = ['data', 'hora', 'motivo', 'editar'];
  
  // consultas = [
    //   { data: '01/01/2022', hora: '09:00', motivo: 'Dor de cabeça' },
    //   { data: '15/02/2022', hora: '10:30', motivo: 'Febre alta' }
  // ];

  editarConsulta(consulta: any) {
      // Implemente a lógica de edição da consulta aqui
      console.log('Editar consulta:', consulta);
      this.router.navigate(['/cadastro-paciente'])
  }
    
    
    colunasExames: string[] = ['data', 'hora', 'nome', 'laboratorio', 'editar'];
  
    // exames = [
      //   { data: '05/03/2022', hora: '08:00', nome: 'Hemograma', laboratorio: 'Lab ABC' },
      //   { data: '20/04/2022', hora: '11:00', nome: 'Ultrassom', laboratorio: 'Lab XYZ' }
      // ];
      
  editarExame(exame: any) {
    // Implemente a lógica de edição do exame aqui
    console.log('Editar exame:', exame);
  }
  

}

