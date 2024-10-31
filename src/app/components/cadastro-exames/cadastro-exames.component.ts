import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/title.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { PacientesService } from '../../services/pacientes.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CardInfoPacientesComponent } from '../home/card-info-pacientes/card-info-pacientes.component';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ExamesService } from '../../services/exames.service';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro-exames',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatNativeDateModule, 
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatLabel,
    MatIcon,
    CardInfoPacientesComponent,
    MatTable,
    MatIconModule,
    MatTableModule,
    MatDatepickerModule,
    MatDatepicker,
    CommonModule
   ],
  templateUrl: './cadastro-exames.component.html',
  styleUrls: ['./cadastro-exames.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class CadastroExamesComponent implements OnInit {
  pacientes: any[] = [];
  textoPesquisa: string = '';
  pacienteSelecionado: { id: string; nomeCompleto: string } | null = null;
  displayedColumns: string[] = ['registro', 'nomePaciente', 'acao'];
  exameId: string | any;
  exameForm: FormGroup;

  constructor (
    private readonly pageTitleService: PageTitleService,
    private readonly pacientesService: PacientesService,
    private readonly examesService: ExamesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {
    this.pageTitleService.setPageTitle('CADASTRO DE EXAMES');

    this.exameForm = new FormGroup({
      nomeCompletoPaciente: new FormControl(''),
      idPaciente: new FormControl(''),
      nomeExame: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      dataExame: new FormControl('', [Validators.required]),
      horarioExame: new FormControl('', [Validators.required]),
      tipoExame: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]),
      laboratorio: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]),
      urlDocumento: new FormControl(''),
      resultados: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    });
  }
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.exameId = params['exameId']; 
      if (this.exameId) {
        this.carregarExame();
      }
    });

    this.atualizarListaPacientes();
  }

  carregarExame() {
    const exame = this.examesService.obterExamePorId(this.exameId);
    if (exame) {
      this.exameForm.patchValue(exame);
      this.exameForm.get('nomeCompletoPaciente')?.disable();
    } else {
      console.error('Exame não encontrado');
    }
  }

  atualizarListaPacientes() {
    this.pacientes = this.pacientesService.obterPacientes();
  }

  pesquisarPacientes() {
    const textoPesquisa = this.textoPesquisa.trim();
    if (!textoPesquisa) {
      this.atualizarListaPacientes();
    } else {
      this.pacientes = this.pacientesService.pesquisarPacientes(textoPesquisa);
      this.pacienteSelecionado = null;  
    }
  }

  selecionarPaciente(paciente: any) {
    this.pacienteSelecionado = paciente;
    this.exameForm.patchValue({
      nomeCompletoPaciente: paciente.nomeCompleto,
      idPaciente: paciente.id
    });
  }

  validarForm() {
    if (this.exameForm.valid) {
      console.log('Formulário válido');
      return true;
    } else {
      console.log('Formulário inválido');
      this.exameForm.markAllAsTouched(); // Marca todos os campos como tocados para exibir mensagens de erro
      return false;
    }
  }

  cadastrarExame() {
    if (this.validarForm()) {
      const formData = this.exameForm.value;
      this.examesService.addExame(formData).subscribe({
        next: () => {
          this.snackBar.open('Exame cadastrado com sucesso!', 'OK', { duration: 3000 });
          this.router.navigate(['home']);
        },
        error: (err) => {
          console.error('Erro ao cadastrar exame:', err);
          this.snackBar.open('Erro ao cadastrar exame. Tente novamente.', 'OK', { duration: 3000 });
        }
      });
    }
  }

  deletarExame() {
    if (this.exameId) {
      const snackBarRef = this.snackBar.open('Tem certeza que deseja deletar esse exame?', 'CONFIRMAR', {
        duration: 5000
      });

      snackBarRef.onAction().subscribe(() => {
        this.examesService.deleteExame(this.exameId).subscribe({
          next: () => {
            this.snackBar.open('Exame deletado com sucesso!', 'OK', { duration: 3000 });
            this.router.navigate(['home']);
          },
          error: (err) => {
            console.error('Erro ao deletar exame:', err);
            this.snackBar.open('Erro ao deletar exame. Tente novamente.', 'OK', { duration: 3000 });
          }
        });
      });
    } else {
      console.error('ID do exame não encontrado para exclusão.');
    }
  }

  editarExame() {
    if (this.exameForm.valid && this.pacienteSelecionado) {
      const exameFormPreenchido = this.exameForm.value;
      exameFormPreenchido.idExame = this.exameId;
      this.examesService.updateExame(this.exameId, exameFormPreenchido).subscribe({
        next: () => {
          this.snackBar.open('Exame atualizado com sucesso!', 'OK', { duration: 3000 });
        },
        error: (err) => {
          console.error('Erro ao atualizar exame:', err);
          this.snackBar.open('Erro ao atualizar exame. Tente novamente.', 'OK', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Nenhum paciente selecionado. Selecione um paciente para atualizar o exame.', 'OK', { duration: 3000 });
    }
  }
}