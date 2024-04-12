import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-card-info-pacientes',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './card-info-pacientes.component.html',
  styleUrl: './card-info-pacientes.component.scss'
})
export class CardInfoPacientesComponent {

  searchPatient(){

  }
  
}
