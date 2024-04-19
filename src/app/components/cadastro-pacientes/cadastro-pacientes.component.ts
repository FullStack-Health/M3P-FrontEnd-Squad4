import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ConsultaCepService } from '../../services/consulta-cep.service';
import { PageTitleService } from '../../services/title.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PacientesService } from '../../services/pacientes.service';
import { ActivatedRoute } from '@angular/router';


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
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './cadastro-pacientes.component.html',
  styleUrl: './cadastro-pacientes.component.scss'
})
export class CadastroPacientesComponent implements OnInit {

  constructor(
    private pageTitleService: PageTitleService,
    private consultaCepService: ConsultaCepService,
    private pacientesService: PacientesService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.pageTitleService.setPageTitle('CADASTRO DE PACIENTE');
   }
  

patRegForm = new FormGroup ({
  nomeCompleto: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
  genero: new FormControl('', [Validators.required]),
  dataNascimento: new FormControl('', [Validators.required]),
  cpf: new FormControl('', [Validators.required]),
  rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  orgaoExpedidor: new FormControl('', Validators.required),
  estadoCivil: new FormControl('', [Validators.required]),
  telefone: new FormControl('', [Validators.required]),
  email: new FormControl('', [Validators.email]),
  naturalidade: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]),
  contatoEmergencia: new FormControl('', [Validators.required]),
  alergias: new FormControl(''),
  cuidadosEspecificos: new FormControl(''),
  convenio: new FormControl(''),
  numeroConvenio: new FormControl(''),
  validadeConvenio: new FormControl(''),
  cep: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
  cidade: new FormControl(''),
  estado: new FormControl(''),
  logradouro: new FormControl(''),
  numero: new FormControl(''),
  complemento: new FormControl(''),
  bairro: new FormControl(''),
  pontoReferencia: new FormControl('')
});

ngOnInit(): void {
  this.activatedRoute.params.subscribe(params => {
    const idPaciente = params['id'];
    if (idPaciente) {
      const paciente = this.pacientesService.obterPacientePorId(idPaciente);
      if (paciente) {
        this.patRegForm.patchValue(paciente);
      }
    }
  });
}

  endereco: any | undefined = undefined;
  ;

  consultaCEP() {
    const cepValue = this.patRegForm.get('cep')?.value;
    if (cepValue && cepValue.length === 8) { // Verifica se o CEP tem 8 dígitos
      this.consultaCepService.obterEndereco(cepValue).subscribe(
        {
          next: (response: any) => {
            this.endereco = response;
            this.preencherCamposEndereco(response);
            // console.log(response);
          },
          error: (error: any) => {
            console.error(error);
          }
        }
      );
    }
  }

  preencherCamposEndereco(endereco: any) {
    this.patRegForm.patchValue({
      cidade: endereco.localidade,
      estado: endereco.uf,
      logradouro: endereco.logradouro,
      bairro: endereco.bairro
    });
  }

  
  isFormValid(): boolean {
    return this.patRegForm.valid &&
      this.patRegForm.get('nomeCompleto')?.value !== '' &&
      this.patRegForm.get('genero')?.value !== '' &&
      this.patRegForm.get('dataNascimento')?.value !== '' &&
      this.patRegForm.get('cpf')?.value !== '' &&
      this.patRegForm.get('rg')?.value !== '' &&
      this.patRegForm.get('orgaoExpedidor')?.value !== '' &&
      this.patRegForm.get('telefone')?.value !== '' &&
      this.patRegForm.get('naturalidade')?.value !== '' &&
      this.patRegForm.get('contatoEmergencia')?.value !== '' &&
      this.patRegForm.get('cep')?.value !== '';
  }
  

  cadastrarPaciente(){
    console.log('Paciente salvo com sucesso!')
    if(this.patRegForm.valid) {
      const formData = this.patRegForm.value;
      this.pacientesService.salvarPaciente(formData);
      this.patRegForm.reset();
    }
  }
}
