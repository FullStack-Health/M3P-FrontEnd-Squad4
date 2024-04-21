import { Component, AfterViewInit } from '@angular/core';
import { PageTitleService } from '../../services/title.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { PacientesService } from '../../services/pacientes.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CardInfoPacientesComponent } from '../home/card-info-pacientes/card-info-pacientes.component';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ExamesService } from '../../services/exames.service';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';


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
  pacienteSelecionado: any | null = null;
  displayedColumns: string[] = ['registro', 'nomePaciente', 'acao'];
  exameId: string | null = null;
  exameForm: FormGroup;


  constructor (
    private pageTitleService: PageTitleService,
    private pacientesService: PacientesService,
    private examesService: ExamesService,
    private route: ActivatedRoute
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
    this.route.params.subscribe(params => {
      this.exameId = params['exameId']; 
      if (this.exameId) {
        this.carregarExame();
      }
    });

    this.atualizarListaPacientes();
  }

  carregarExame() {
    const exame = this.examesService.obterExamePorId(this.exameId!);
    if (exame) {
      this.exameForm.patchValue({
        nomeCompletoPaciente: exame.nomeCompletoPaciente,
        idPaciente: exame.idPaciente,
        nomeExame: exame.nomeExame,
        dataExame: exame.dataExame,
        horarioExame: exame.horarioExame,
        tipoExame: exame.tipoExame,
        laboratorio: exame.laboratorio,
        urlDocumento: exame.urlDocumento,
        resultados: exame.resultados,
      });
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
      alert('Formulário inválido ou nenhum paciente selecionado. Verifique os campos.');
    }
  } 
}