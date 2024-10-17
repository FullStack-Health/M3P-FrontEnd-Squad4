import { Component } from '@angular/core';
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
    MatDatepicker
   ],
  templateUrl: './cadastro-exames.component.html',
  styleUrls: ['./cadastro-exames.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class CadastroExamesComponent {
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
  ) {
    this.pageTitleService.setPageTitle('CADASTRO DE EXAMES');

    this.exameForm = new FormGroup({
      nomeCompletoPaciente: new FormControl(''),
      idPaciente: new FormControl(''),
      nomeExame: new FormControl('', [Validators.required]),
      dataExame: new FormControl('', [Validators.required]),
      horarioExame: new FormControl('', [Validators.required]),
      tipoExame: new FormControl('', [Validators.required]),
      laboratorio: new FormControl('', [Validators.required]),
      urlDocumento: new FormControl('', [Validators.required]),
      resultados: new FormControl('', [Validators.required]),
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

  cadastrarExame(){
    if (this.exameForm.valid && this.pacienteSelecionado) {
      const exameFormPreenchido = this.exameForm.value;
      this.examesService.salvarExame(exameFormPreenchido, this.pacienteSelecionado);
      this.exameForm.reset();
      alert("Exames cadastrados com sucesso!")
    } else {
      alert('Nenhum paciente selecionado. Selecione um paciente para salvar o exame.');
    }
  } 


  deletarExame() {
    if (this.exameId) {
      if (confirm("Tem certeza que deseja deletar esse exame?")) {
      this.examesService.deletarExame(this.exameId);
      alert("Exame deletado com sucesso!");
      this.router.navigate(['home']);}
    } else {
      console.error('ID do exame não encontrado para exclusão.');
    }
  }

  editarExame() {
    if (this.exameForm.valid && this.pacienteSelecionado) {
      const exameFormPreenchido = this.exameForm.value;
      exameFormPreenchido.idExame = this.exameId;
      this.examesService.atualizarExame(exameFormPreenchido);
      alert("Exame atualizado com sucesso!");
    } else {
      alert('Nenhum paciente selecionado. Selecione um paciente para atualizar o exame.');
    }
  }
  

}
