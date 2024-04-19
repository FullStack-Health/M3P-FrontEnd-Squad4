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
    NgxMaterialTimepickerModule,
    MatIcon,
    CardInfoPacientesComponent,
    MatTable,
    MatIconModule,
    MatTableModule,
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


  constructor (private pageTitleService: PageTitleService, private pacientesService: PacientesService) {
    this.pageTitleService.setPageTitle('CADASTRO DE EXAMES');
  }
  
  ngOnInit(): void {
    this.atualizarListaPacientes();
  }  

  atualizarListaPacientes() {
    this.pacientes = this.pacientesService.obterPacientes();
  }

  exameForm = new FormGroup({
    buscarPaciente: new FormControl(''),
    idPaciente: new FormControl(''),
    nomeExame: new FormControl('', [Validators.required]),
    dataExame: new FormControl('', [Validators.required]),
    horarioExame: new FormControl('', [Validators.required]),
    tipoExame: new FormControl('', [Validators.required]),
    laboratorio: new FormControl('', [Validators.required]),
    urlDocumento: new FormControl('', [Validators.required]),
    resultados: new FormControl('', [Validators.required]),
  });

  
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

  cadastrarExame(){

  }
}
