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
import { MatLine } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ConsultasService } from '../../services/consultas.service';

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
  ],
  templateUrl: './cadastro-consulta.component.html',
  styleUrl: './cadastro-consulta.component.scss'
})
export class CadastroConsultaComponent implements OnInit {

  pacientes: any[] = [];
  textoPesquisa: string = '';
  displayedColumns: string[] = ['registro', 'nomePaciente', 'acao'];
  pacienteSelecionado: any | null = null;
  today: any;
  consultaEditando: any | null = null;

  constructor(
    private pageTitleService: PageTitleService,
    private pacientesService: PacientesService,
    private consultasService: ConsultasService) {
    
    this.pageTitleService.setPageTitle('CADASTRO DE CONSULTA');
  }

  ngOnInit(): void {
    this.atualizarListaPacientes();
  }

  atualizarListaPacientes() {
    this.pacientes = this.pacientesService.obterPacientes();
  }

  consultaForm = new FormGroup({
    nomeCompletoPaciente: new FormControl(''),
    idPaciente: new FormControl(''),
    motivoConsulta: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
    dataConsulta: new FormControl(this.getCurrentDate(), Validators.required),
    horarioConsulta: new FormControl('', Validators.required),
    descricaoProblema: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    medicacaoReceitada: new FormControl(''),
    dosagemPrecaucoes: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(256)])
  });

  
  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
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

  editarConsulta(consulta: any) {
    this.consultaEditando = consulta;
    // Preencher o formulário com os dados da consulta para edição
    this.consultaForm.patchValue({
      // Preencher os campos conforme necessário com os dados da consulta selecionada
    });
    
  }

  deletarConsulta(id: string) {
    this.consultasService.deletarConsulta(id);
  }
}
