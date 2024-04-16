import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PageTitleService } from '../../services/title.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

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
    MatCard,
    MatIcon,
    MatCardContent,
    MatButton,
    NgxMaterialTimepickerModule
  ],
  templateUrl: './cadastro-consulta.component.html',
  styleUrl: './cadastro-consulta.component.scss'
})
export class CadastroConsultaComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) {}

  ngOnInit(): void {
    this.pageTitleService.setPageTitle('CADASTRO DE CONSULTA');
  }
today: any;

  consultaForm = new FormGroup({
    pacienteSearch: new FormControl(''),
    motivoConsulta: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
    dataConsulta: new FormControl(this.getCurrentDate(), Validators.required),
    horarioConsulta: new FormControl('', Validators.required),
    descricaoProblema: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(1024)]),
    medicacaoReceitada: new FormControl(''),
    dosagemPrecaucoes: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(256)])
  });

 
  submitForm() {
    if (this.consultaForm?.valid) {
      // Implementar a lógica para salvar a consulta aqui
      console.log('Formulário válido. Salvando consulta...');
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // getCurrentTime(): string {
  //   const now = new Date();
  //   const hours = this.padZero(now.getHours());
  //   const minutes = this.padZero(now.getMinutes());
  //   return `${hours}:${minutes}`;
  // }

  // padZero(num: number): string {
  //   return num < 10 ? `0${num}` : num.toString();
  // }

  pesquisarPacientes(){
    
  }  

}
