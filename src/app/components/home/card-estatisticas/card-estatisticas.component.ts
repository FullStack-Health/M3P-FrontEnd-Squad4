import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-estatisticas',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIcon,
    MatIconModule,
    MatLabel,
    MatFormField 
  ],
  templateUrl: './card-estatisticas.component.html',
  styleUrl: './card-estatisticas.component.scss'
})
export class CardEstatisticasComponent {

  @Input() quantidadePacientes: number | undefined;
}
