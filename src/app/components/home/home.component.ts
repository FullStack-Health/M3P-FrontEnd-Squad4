import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
        FormsModule   
    ]
})
export class HomeComponent implements OnInit {

    constructor(private pageTitleService: PageTitleService) { }
  
    ngOnInit(): void {
      this.pageTitleService.setPageTitle('ESTATÍSTICAS E INFORMAÇÕES');
    }

    
    listaPacientes = [
        {
            imagem: 'assets/img/maria-da-silva.png',
            nomeCompleto: 'Maria da Silva',
            idade: '45 anos',
            tel: '(11) 97777-7777',
            convenio: 'Amil',
            email: 'maria@example.com'
        },
        {
            imagem: 'assets/img/joao-souza.png',
            nomeCompleto: 'João Souza',
            idade: '28 anos',
            tel: '(21) 96666-6666',
            convenio: 'SulAmérica',
            email: 'joao@example.com'
        },
        {
            imagem: 'assets/img/ana-santos.png',
            nomeCompleto: 'Ana Santos',
            idade: '50 anos',
            tel: '(31) 95555-5555',
            convenio: 'Bradesco Saúde',
            email: 'ana@example.com'
        },
        {
            imagem: 'assets/img/pedro-oliveira.png',
            nomeCompleto: 'Pedro Oliveira',
            idade: '42 anos',
            tel: '(19) 94444-4444',
            convenio: 'Golden Cross',
            email: 'pedro@example.com'
        },
        {
            imagem: 'assets/img/carla-lima.png',
            nomeCompleto: 'Carla Lima',
            idade: '37 anos',
            tel: '(51) 93333-3333',
            convenio: 'Porto Seguro',
            email: 'carla@example.com'
        },
        {
            imagem: 'assets/img/fernanda-costa.png',
            nomeCompleto: 'Fernanda Costa',
            idade: '29 anos',
            tel: '(35) 92222-2222',
            convenio: 'Unimed',
            email: 'fernanda@example.com'
        },
        {
            imagem: 'assets/img/camila-rodrigues.png',
            nomeCompleto: 'Camila Rodrigues',
            idade: '31 anos',
            tel: '(14) 90000-0000',
            convenio: 'SulAmérica',
            email: 'camila@example.com'
        },
        {
            imagem: 'assets/img/lucas-silva.png',
            nomeCompleto: 'Lucas Silva',
            idade: '40 anos',
            tel: '(47) 98888-1111',
            convenio: 'Bradesco Saúde',
            email: 'lucas@example.com'
        }
    ];
    
    quantidadePacientes = this.listaPacientes.length;
    
    textoPesquisa: string | undefined = '';
    listaPacientesFiltro = this.listaPacientes;
    paciente: any;
    
    
    pesquisarPacientes() {
        const textoPesquisa = this.textoPesquisa ?? '';
        if (!this.textoPesquisa) {
            this.listaPacientesFiltro = this.listaPacientes;
        } else {
            this.listaPacientesFiltro = this.listaPacientes.filter(item => 
                item.nomeCompleto.toLowerCase().includes(textoPesquisa.toLowerCase()) ||
                item.tel.includes(textoPesquisa) ||
                item.email.includes(textoPesquisa)
            )
        }
        this.textoPesquisa = '';
    }
    
  
}
