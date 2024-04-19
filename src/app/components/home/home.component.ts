import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from "../../shared/menu-lateral/menu-lateral.component";
import { RouterOutlet } from '@angular/router';
import { CardInfoPacientesComponent } from './card-info-pacientes/card-info-pacientes.component';
import { CardEstatisticasComponent } from './card-estatisticas/card-estatisticas.component';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { PageTitleService } from '../../services/title.service';
import { PacientesService } from '../../services/pacientes.service';
import { ConsultasService } from '../../services/consultas.service';
import { ExamesService } from '../../services/exames.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        MenuLateralComponent,
        RouterOutlet,
        CardInfoPacientesComponent,  
        CardEstatisticasComponent,
        CommonModule,
        MatIcon,
        MatLabel,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatDividerModule   
    ]
})
export class HomeComponent implements OnInit {
    
    pacientes: any[] = [];
    quantidadePacientes: number = 0;
    textoPesquisa: string = '';
    quantidadeExames: number = 0;
    quantidadeConsultas: number = 0;

    constructor(
        private pageTitleService: PageTitleService,
        private pacientesService: PacientesService,
        private consultasService: ConsultasService,
        private examesService: ExamesService
    ) {
        this.pageTitleService.setPageTitle('ESTATÍSTICAS E INFORMAÇÕES');
    }

    ngOnInit(): void {
        this.pacientesService.obterPacientes();
        this.atualizarListaPacientes();
        this.atualizarQuantidadeExames();
        this.atualizarQuantidadeConsultas();
    }
    

    atualizarListaPacientes() {
        this.pacientes = this.pacientesService.obterPacientes();
        this.quantidadePacientes = this.pacientes.length;
    }

    atualizarQuantidadeExames() {
        this.quantidadeExames = this.examesService.obterQuantidadeExames();
    }

    atualizarQuantidadeConsultas() {
        this.quantidadeConsultas = this.consultasService.obterQuantidadeConsultas();
    }

    pesquisarPacientes() {
    const textoPesquisa = this.textoPesquisa.trim();
    if (!textoPesquisa) {
        this.atualizarListaPacientes();
    } else {
        this.pacientes = this.pacientesService.pesquisarPacientes(textoPesquisa);
    }
    this.textoPesquisa = '';
    }

}