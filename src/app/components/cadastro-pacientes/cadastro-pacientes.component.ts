import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ConsultaCepService } from '../../services/consulta-cep.service';
import { PageTitleService } from '../../services/title.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cadastro-pacientes',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
   ],
  templateUrl: './cadastro-pacientes.component.html',
  styleUrl: './cadastro-pacientes.component.scss'
})
export class CadastroPacientesComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService, private consultaCepService: ConsultaCepService) {

    this.pageTitleService.setPageTitle('CADASTRO DE PACIENTE');
   }
  
  ngOnInit(): void {
  }

patRegForm = new FormGroup ({
  fullName: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
  gender: new FormControl('', [Validators.required]),
  dataNascimento: new FormControl('', [Validators.required]),
  cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]),
  rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  estadoCivil: new FormControl('', [Validators.required]),
  telefone: new FormControl('', [Validators.required, Validators.pattern(/^\(\d{2}\) \d \d{4}-\d{5}$/)]),
  email: new FormControl('', [Validators.email]),
  naturalidade: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]),
  contatoEmergencia: new FormControl('', [Validators.required, Validators.pattern(/^\(\d{2}\) \d \d{4}-\d{5}$/)]),
  alergias: new FormControl(''),
  cuidadosEspecificos: new FormControl(''),
  convenio: new FormControl(''),
  numeroConvenio: new FormControl(''),
  validadeConvenio: new FormControl(''),
  // cep: new FormControl(''),
  // cidade: new FormControl(''),
  // estado: new FormControl(''),
  // logradouro: new FormControl(''),
  // numero: new FormControl(''),
  // complemento: new FormControl(''),
  // bairro: new FormControl(''),
  pontoReferencia: new FormControl('')
});


  endereco: any | undefined = undefined;
  ;





// consultaCEP() {
//     this.consultaCepService.obterEndereco(this.patRegForm.value.cep).subscribe(
//       {
//         next: (response: any) => {
//           this.endereco = response;
//           console.log(response);
//         },
//         error: (error: any) => {
//           console.error(error);
//         }
//       }
//     )
// }

  submitForm(){

  }
}
