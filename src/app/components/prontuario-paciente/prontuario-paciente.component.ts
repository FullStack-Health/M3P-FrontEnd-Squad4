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
import { Observable } from 'rxjs';
import { FormatarTelefonePipe } from "../../pipes/formatar-telefone.pipe";

@Component({
    selector: 'app-prontuario-paciente',
    standalone: true,
    templateUrl: './prontuario-paciente.component.html',
    styleUrl: './prontuario-paciente.component.scss',
    imports: [
        RouterLink,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTableModule,
        MatIcon,
        CommonModule,
        FormatarTelefonePipe
    ]
})
export class ProntuarioPacienteComponent {
  paciente: any;
  consultas: any[] = [];
  exames: any[] = [];

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
  this.activatedRoute.params.subscribe(params => {
    const pacienteId = params['id'];
    this.paciente = this.pacientesService.obterPacientePorId(pacienteId);
    this.consultas = this.consultasService.obterConsultasPorId(pacienteId);
    this.exames = this.examesService.obterExamesPorId(pacienteId);
    console.log(this.consultas);
    console.log(this.exames)
  });
}

  colunasConsultas: string[] = ['data', 'hora', 'motivo', 'editar'];
  
  editarConsulta(consulta: any) {
    const idConsulta = consulta.idConsulta;
    this.router.navigate(['/cadastro-consulta', idConsulta]);
  }
    
    
  colunasExames: string[] = ['data', 'hora', 'nome', 'laboratorio', 'editar'];
  
editarExame(exame: any) {
  const idExame = exame.idExame;
  this.router.navigate(['/cadastro-exames', idExame]);
}

  

}

