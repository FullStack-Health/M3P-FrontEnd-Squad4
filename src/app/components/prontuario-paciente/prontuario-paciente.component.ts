import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { PageTitleService } from '../../services/title.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PacientesService } from '../../services/pacientes.service';
import { CommonModule } from '@angular/common';
import { FormatarTelefonePipe } from '../../pipes/formatar-telefone.pipe';
import { Exame } from '../../entities/exame.model';
import { Consulta } from '../../entities/consulta.model';
import { ProntuarioService } from '../../services/prontuario.service';
import { Paciente } from '../../entities/paciente.model';
import { HorarioPipe } from '../../pipes/horario.pipe';

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
        FormatarTelefonePipe,
        HorarioPipe
    ]
})
export class ProntuarioPacienteComponent {
  paciente: Paciente | undefined;
  consultas: Consulta[] = [];
  exames: Exame[] = [];
  exame: Exame | undefined;
  loading: boolean = true;
  error: string | null = null;

  colunasConsultas: string[] = ['data', 'hora', 'motivo', 'editar'];
  colunasExames: string[] = ['data', 'hora', 'nome', 'laboratorio', 'editar'];

  constructor(
    private readonly pageTitleService: PageTitleService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly pacientesService: PacientesService,
    private readonly prontuarioService: ProntuarioService
  ) {
    this.pageTitleService.setPageTitle('PRONTUÁRIO DE PACIENTE');
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const pacienteId = params['id'];
      this.obterDadosPaciente(pacienteId);
      this.obterConsultas(pacienteId);
      this.obterExames(pacienteId);
    });
  }

  obterDadosPaciente(pacienteId: string): void {
    this.pacientesService.obterPacientesPorNomeOuPorId(pacienteId).subscribe({
      next: (pacientes: Paciente[]) => {
        console.log('Resposta completa recebida do backend:', pacientes);
        if (pacientes && pacientes.length > 0) {
          this.paciente = pacientes[0];
          console.log('Paciente processado:', this.paciente);
        } else {
          console.warn('Nenhum paciente encontrado.');
        }
      },
      error: (error) => {
        console.error('Erro ao obter os dados do paciente:', error);
      }
    });
  }

  obterConsultas(pacienteId: string): void {
    this.prontuarioService.getConsultasPaciente(pacienteId).subscribe({
      next: (consultas: Consulta[]) => {
        this.consultas = consultas;
        console.log('Consultas recebidas:', this.consultas);
      },
      error: (error) => {
        console.error('Erro ao obter consultas:', error);
        this.error = 'Erro ao carregar consultas';
      }
    });
  }

  obterExames(pacienteId: string): void {
    this.prontuarioService.getExamesPaciente(pacienteId).subscribe({
      next: (exames: Exame[]) => {
        this.exames = exames;
        console.log('Exames recebidos:', this.exames);
      },
      error: (error) => {
        console.error('Erro ao obter exames:', error);
        this.error = 'Erro ao carregar exames';
      }
    });
  }

  editarConsulta(consulta: Consulta): void {
    const idConsulta = consulta.id;
    this.router.navigate(['/cadastro-consulta', idConsulta]);
  }

  editarExame(exame: Exame): void {
    const idExame = exame.id;
    this.router.navigate(['/cadastro-exames', idExame]);
  }
}
