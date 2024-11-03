import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PageTitleService } from '../../services/title.service';
import { MatList, MatListItem } from '@angular/material/list';
import { PacientesService } from '../../services/pacientes.service';
import { MAT_DATE_LOCALE, MatLine, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ConsultasService } from '../../services/consultas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Paciente } from '../../entities/paciente.model';
import { Consulta } from '../../entities/consulta.model';

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
    MatNativeDateModule
  ],
  templateUrl: './cadastro-consulta.component.html',
  styleUrl: './cadastro-consulta.component.scss',
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
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
  consultaForm: FormGroup;

  constructor(
    private pageTitleService: PageTitleService,
    private pacientesService: PacientesService,
    private consultasService: ConsultasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    
    this.pageTitleService.setPageTitle('CADASTRO DE CONSULTA');
    this.consultaForm = new FormGroup({      
      nome: new FormControl(''),
      idPaciente: new FormControl(''),
      motivo: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
      ]),
      dataConsulta: new FormControl('', Validators.required),
      horarioConsulta: new FormControl('', Validators.required),
      descricaoProblema: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
      medicacaoReceitada: new FormControl(''),
      dosagemPrecaucoes: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(256)])
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.consultaId = params['consultaId'];
      if (this.consultaId) {
        // this.consultaForm.patchValue(this.consultasService.obterConsultaPorId(this.consultaId)  );
        this.carregarConsulta();
      }
    });

    this.atualizarListaPacientes();
  }
  

  carregarConsulta() {
    const consulta = this.consultasService.obterConsultaPorId(this.consultaId);
    console.log(consulta)
    if (consulta) {
      this.consultaForm.patchValue(consulta);
      this.consultaForm.get('nome')?.disable();
      // this.pacienteSelecionado.nomeCompleto = consulta.paciente.nome;
      // this.consultaForm.get('nomeCompletoPaciente')?.disable();
    } else {
      console.error('Consulta não encontrada');
    }
  }

  atualizarListaPacientes() {
    this.pacientesService.obterPacientes().subscribe((pacientes: Paciente[]) => {
      this.pacientes = pacientes;
    });
  }

  // pesquisarPacientes() {
  //   const textoPesquisa = this.textoPesquisa.trim();
  //   if (!textoPesquisa) {
  //     this.atualizarListaPacientes();
  //   } else {
  //     this.pacientes = this.pacientesService.pesquisarPacientes(textoPesquisa);
  //     this.pacienteSelecionado = null;
  //   }
  // }

  pesquisarPacientes(textoPesquisa: any) {
    const buscaInput = this.textoPesquisa;
    this.pacientesService.getPacientesPorEmailOuPorId(buscaInput).subscribe(pacientes => {
      this.pacientes = Array.isArray(pacientes) ? pacientes : [pacientes];
    });
  }

  selecionarPaciente(paciente: any) {
    this.pacienteSelecionado = paciente;
    this.consultaForm.patchValue({
      nome: paciente.nome,
      idPaciente: paciente.id
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
    }
  }

  
  deletarConsulta() {
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
    } else {
        console.error('ID da consulta não encontrado para exclusão.');
      }
  }

 
  editarConsulta() {
      this.activatedRoute.url.subscribe(console.log)
      const consultaFormPreenchido = this.consultaForm.value;
      consultaFormPreenchido.idConsulta = this.consultaId;
      console.log(consultaFormPreenchido)
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
    
  }
}
