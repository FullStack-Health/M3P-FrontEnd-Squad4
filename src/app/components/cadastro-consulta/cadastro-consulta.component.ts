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
      motivoConsulta: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      dataConsulta: new FormControl('', Validators.required),
      horarioConsulta: new FormControl('', Validators.required),
      descricaoProblema: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
      medicacaoReceitada: new FormControl(''),
      dosagemPrecaucoes: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(256)])
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.consultaId = params['consultaId'];
      if (this.consultaId) {
        this.carregarConsulta();
      }
    });

    this.atualizarListaPacientes();
  }
  

  carregarConsulta() {
    const consulta = this.consultasService.obterConsultaPorId(this.consultaId);
    console.log(consulta)
    if (consulta) {
    this.consultaForm.patchValue({
      nomeCompletoPaciente: consulta.nomeCompletoPaciente,
      idPaciente: consulta.idPaciente,
      motivoConsulta: consulta.motivoConsulta,
      dataConsulta: consulta.dataConsulta,
      horarioConsulta: consulta.horarioConsulta,
      descricaoProblema: consulta.descricaoProblema,
      medicacaoReceitada: consulta.medicacaoReceitada,
      dosagemPrecaucoes: consulta.dosagemPrecaucoes
    });
    
    } else {
      console.error('Consulta não encontrada');
    }
  }

  atualizarListaPacientes() {
    this.pacientesService.obterPacientes().subscribe(pacientes => {
      this.pacientes = pacientes;
    });
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }
  

  pesquisarPacientes() {
    const textoPesquisa = this.textoPesquisa.trim();
    if (!textoPesquisa) {
      this.atualizarListaPacientes();
    } else {
      this.pacientesService.pesquisarPacientes(textoPesquisa).subscribe(pacientes => {
        this.pacientes = pacientes;
      });
      // this.pacienteSelecionado = null;  
    }
  }
  
  selecionarPaciente(paciente: any) {
    this.pacienteSelecionado = paciente;
    this.consultaForm.patchValue({
      ...this.consultaForm.value, 
      nomeCompletoPaciente: paciente.nomeCompleto,
      idPaciente: paciente.id
    });
  }
  
  cadastrarConsulta() {
    if (this.consultaForm.valid && this.pacienteSelecionado) {
      const formConsultaPreenchido = this.consultaForm.value;
      this.consultasService.salvarConsulta(formConsultaPreenchido, this.pacienteSelecionado);
      this.consultaForm.reset();
      alert('Consulta cadastrada com sucesso!');
    } else {
      alert('Formulário inválido ou nenhum paciente selecionado. Verifique os campos.');
    }
  }

  deletarConsulta() {
    console.log(this.consultaId)
    if (this.consultaId) {
      if (confirm("Tem certeza que deseja deletar essa consulta?")) {
        this.consultasService.deletarConsulta(this.consultaId);
        alert('Consulta deletada com sucesso!');
        this.router.navigate(['home']);
      }
    } else {
        console.error('ID da consulta não encontrado para exclusão.');
      }
  }

 
  editarConsulta() {
    if (this.consultaForm.valid && this.pacienteSelecionado) {
      const consultaFormPreenchido = this.consultaForm.value;
      consultaFormPreenchido.idConsulta = this.consultaId;
      this.consultasService.atualizarConsulta(consultaFormPreenchido);
      alert("Consulta atualizada com sucesso!");
    } else {
      alert('Nenhum paciente selecionado. Selecione um paciente na lista acima para atualizar a consulta.');
    }
  }

}

