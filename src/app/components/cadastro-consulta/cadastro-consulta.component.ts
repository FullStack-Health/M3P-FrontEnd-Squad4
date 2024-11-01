import { Component, NgModule, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PageTitleService } from '../../services/title.service';
import { MatList, MatListItem } from '@angular/material/list';
import { PacientesService } from '../../services/pacientes.service';
import {
  MAT_DATE_LOCALE,
  MatLine,
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ConsultasService } from '../../services/consultas.service';
import { ActivatedRoute, Router } from '@angular/router';
<<<<<<< Updated upstream
=======
import { MatSnackBar } from '@angular/material/snack-bar';
>>>>>>> Stashed changes

@Component({
  selector: 'app-cadastro-consulta',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIcon,
    MatButton,
    MatList,
    MatListItem,
    MatLine,
    MatIconModule,
    MatTableModule,
    FormsModule,
    CommonModule,
    MatNativeDateModule,
  ],
  templateUrl: './cadastro-consulta.component.html',
  styleUrl: './cadastro-consulta.component.scss',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class CadastroConsultaComponent implements OnInit {
  pacientes: any[] = [];
  textoPesquisa: string = '';
  displayedColumns: string[] = ['registro', 'nomePaciente', 'acao'];
  pacienteSelecionado: any | null = null;
  today: any;
  consultaEditando: any | null = null;
  consulta: any;
  consultaId!: string;
  pacienteSelecionado: { id: string; nomeCompleto: string } | null = null;
  consultaId: string | any;
  consultaForm: FormGroup;

  constructor(
    private pageTitleService: PageTitleService,
    private pacientesService: PacientesService,
    private consultasService: ConsultasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    private readonly pageTitleService: PageTitleService,
    private readonly pacientesService: PacientesService,
    private readonly consultasService: ConsultasService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {
    this.pageTitleService.setPageTitle('CADASTRO DE CONSULTA');
    this.consultaForm = new FormGroup({
      motivoConsulta: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      dataConsulta: new FormControl('', Validators.required),
      horarioConsulta: new FormControl('', Validators.required),
      descricaoProblema: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(1024),
      ]),
      medicacaoReceitada: new FormControl(''),
      dosagemPrecaucoes: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(256),
      ]),
    });
  }

  ngOnInit(): void {
<<<<<<< Updated upstream
    this.activatedRoute.params.subscribe(params => {
      this.consultaId = params['consultaId']; 
=======
    this.activatedRoute.params.subscribe((params) => {
      this.consultaId = params['consultaId'];
>>>>>>> Stashed changes
      if (this.consultaId) {
        this.carregarConsulta();
      }
    });

    this.atualizarListaPacientes();
  }

  carregarConsulta() {
    const consulta = this.consultasService.obterConsultaPorId(this.consultaId);
    if (consulta) {
      this.consultaForm.patchValue(consulta);
      this.consultaForm.get('nomeCompletoPaciente')?.disable();
    } else {
      console.error('Consulta não encontrada');
    }
  }
  atualizarListaPacientes() {
    this.pacientes = this.pacientesService.obterPacientes();
  }

<<<<<<< Updated upstream
  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

=======
>>>>>>> Stashed changes
  pesquisarPacientes() {
    const textoPesquisa = this.textoPesquisa.trim();
    if (!textoPesquisa) {
      this.atualizarListaPacientes();
    } else {
      this.pacientes = this.pacientesService.pesquisarPacientes(textoPesquisa);
<<<<<<< Updated upstream
      // this.pacienteSelecionado = null;
=======
      this.pacienteSelecionado = null;
    }
  }

  selecionarPaciente(paciente: any) {
    this.pacienteSelecionado = paciente;
    this.consultaForm.patchValue({
      nomeCompletoPaciente: paciente.nomeCompleto,
      idPaciente: paciente.id,
    });
  }

  validarForm() {
    if (this.consultaForm.valid) {
      console.log('Formulário válido');
      return true;
    } else {
      console.log('Formulário inválido');
      this.consultaForm.markAllAsTouched();
      return false;
    }
  }

  cadastrarConsulta() {
    if (this.validarForm()) {
      const formData = this.consultaForm.value;
      this.consultasService.salvarConsulta(formData).subscribe({
        next: () => {
          this.snackBar.open('Consulta cadastrada com sucesso!', 'OK', {
            duration: 3000,
          });
          this.router.navigate(['home']);
        },
        error: (err: any) => {
          console.error('Erro ao cadastrar consulta:', err);
          this.snackBar.open(
            'Erro ao cadastrar consulta. Tente novamente.',
            'OK',
            { duration: 3000 }
          );
        },
      });
>>>>>>> Stashed changes
    }
  }

  selecionarPaciente(paciente: any) {
    this.pacienteSelecionado = paciente;
    this.consultaForm.patchValue({
      ...this.consultaForm.value,
      nomeCompletoPaciente: paciente.nomeCompleto,
      idPaciente: paciente.id,
    });
  }

  cadastrarConsulta() {
    if (this.consultaForm.valid && this.pacienteSelecionado) {
      const formConsultaPreenchido = {
        ...this.consultaForm.value,
        idPaciente: this.pacienteSelecionado.id,
      };

      this.consultasService
        .cadastrarConsulta(formConsultaPreenchido)
        .subscribe({
          next: () => {
            this.consultaForm.reset();
            this.pacienteSelecionado = null;
            alert('Consulta cadastrada com sucesso!');
          },
          error: (err) => {
            console.error('Erro ao cadastrar consulta:', err);
            alert(
              'Erro ao cadastrar consulta. Verifique os campos e tente novamente.'
            );
          },
        });
    } else {
      alert(
        'Formulário inválido ou nenhum paciente selecionado. Verifique os campos.'
      );
    }
  }
  deletarConsulta() {
<<<<<<< Updated upstream
    console.log(this.consultaId);
    if (this.consultaId) {
      if (confirm('Tem certeza que deseja deletar essa consulta?')) {
        this.consultasService.deletarConsulta(this.consultaId);
        alert('Consulta deletada com sucesso!');
        this.router.navigate(['home']);
      }
=======
    if (this.consultaId) {
      const snackBarRef = this.snackBar.open(
        'Tem certeza que deseja deletar essa consulta?',
        'CONFIRMAR',
        { duration: 5000 }
      );

      snackBarRef.onAction().subscribe(() => {
        this.consultasService.deletarConsulta(this.consultaId).subscribe({
          next: () => {
            this.snackBar.open('Consulta deletada com sucesso!', 'OK', {
              duration: 3000,
            });
            this.router.navigate(['home']);
          },
          error: (err: any) => {
            console.error('Erro ao deletar consulta:', err);
            this.snackBar.open(
              'Erro ao deletar consulta. Tente novamente.',
              'OK',
              { duration: 3000 }
            );
          },
        });
      });
>>>>>>> Stashed changes
    } else {
      console.error('ID da consulta não encontrado para exclusão.');
    }
  }

  editarConsulta() {
    if (this.consultaForm.valid && this.pacienteSelecionado) {
      const consultaFormPreenchido = this.consultaForm.value;
      consultaFormPreenchido.idConsulta = this.consultaId;
<<<<<<< Updated upstream
      this.consultasService.atualizarConsulta(consultaFormPreenchido);
      alert('Consulta atualizada com sucesso!');
    } else {
      alert(
        'Nenhum paciente selecionado. Selecione um paciente na lista acima para atualizar a consulta.'
=======
      this.consultasService
        .atualizarConsulta(this.consultaId, consultaFormPreenchido)
        .subscribe({
          next: () => {
            this.snackBar.open('Consulta atualizada com sucesso', 'OK', {
              duration: 3000,
            });
          },
          error: (err: any) => {
            console.error('Erro ao atualizar consulta: ', err);
            this.snackBar.open(
              'Erro ao atualizar consulta. Tente novamente',
              'OK',
              { duration: 3000 }
            );
          },
        });
    } else {
      this.snackBar.open(
        'Nenhum paciente selecionado. Selecione um paciente para atualizar a consulta.',
        'OK',
        { duration: 3000 }
>>>>>>> Stashed changes
      );
    }
  }
}
