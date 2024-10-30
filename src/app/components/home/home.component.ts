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
import { MatDividerModule } from '@angular/material/divider';
import { UserStorageService } from '../../services/users-storage.service';
import { DashboardService } from '../../services/dashboard.service';
import { PacientesService } from '../../services/pacientes.service';

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
    quantidadeUsuarios: number = 0;
    profile: string | undefined;

    constructor(
        private dashboardService: DashboardService,
        private userService: UserStorageService,
        private pageTitleService: PageTitleService,
        private pacientesService: PacientesService,
      ) {this.pageTitleService.setPageTitle('ESTATÍSTICAS E INFORMAÇÕES');}
    
      
      ngOnInit(): void {
        this.carregarDadosDoDashboard();
        this.profile = this.userService.getProfile();
        this.pacientesService.obterPacientes();
        this.atualizarListaPacientes();
        console.log('Perfil recuperado no HomeComponent:', this.profile);
      }

      atualizarListaPacientes() {
        this.pacientes = this.pacientesService.obterPacientes();
        this.quantidadePacientes = this.pacientes.length;
    }

    
      carregarDadosDoDashboard(): void {
        this.dashboardService.getDashboardData().subscribe(
          (data) => {            
            this.quantidadePacientes = data.numeroPacientes;
            this.quantidadeConsultas = data.numeroConsultas;
            this.quantidadeExames = data.numeroExames;
            this.quantidadeUsuarios = data.numeroUsuarios;
          },
          (error) => {
            console.error('Erro ao carregar dados do dashboard', error);
          }
        );
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