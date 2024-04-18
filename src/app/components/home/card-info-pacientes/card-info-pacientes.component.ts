import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PacientesService } from '../../../services/pacientes.service';
import { IdadePipe } from '../../../pipes/idade.pipe';
import { FormatarTelefonePipe } from '../../../pipes/formatar-telefone.pipe';
import { Router } from '@angular/router';


interface Paciente {
  id: string;
  imagem: string;
  nomeCompleto: string;
  dataNascimento: string;
  telefone: string;
  convenio: string;
}

@Component({
  selector: 'app-card-info-pacientes',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    IdadePipe,
    FormatarTelefonePipe
  ],
  templateUrl: './card-info-pacientes.component.html',
  styleUrl: './card-info-pacientes.component.scss'
})

export class CardInfoPacientesComponent implements OnInit {
  pacientes: Paciente[] = [];
  @Input() paciente: any;

  constructor(private pacientesService: PacientesService, private router: Router) { }

  ngOnInit(): void {
    this.pacientes = this.pacientesService.obterPacientes();
  }

  verMais(idPaciente: string) {
    this.router.navigate(['/cadastro-paciente', idPaciente]);
  }

  
}
