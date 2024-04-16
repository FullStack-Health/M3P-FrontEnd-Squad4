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
   ],
  templateUrl: './cadastro-exames.component.html',
  styleUrls: ['./cadastro-exames.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ]
})
export class CadastroExamesComponent {

  constructor (private pageTitleService: PageTitleService) {
    this.pageTitleService.setPageTitle('CADASTRO DE EXAMES');
   }
  
  ngOnInit(): void {
  }  
  exameForm = new FormGroup({
    nomeExame: new FormControl('', [Validators.required]),
    dataExame: new FormControl('', [Validators.required]),
    horarioExame: new FormControl('', [Validators.required]),
    tipoExame: new FormControl('', [Validators.required]),
    laboratorio: new FormControl('', [Validators.required]),
    urlDocumento: new FormControl('', [Validators.required]),
    resultados: new FormControl('', [Validators.required])
  });

  
  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     this.pageTitleService.setPageTitle('CADASTRO DE EXAMES');
  //   });
  // }

  cadastrarExame(){

  }
}
