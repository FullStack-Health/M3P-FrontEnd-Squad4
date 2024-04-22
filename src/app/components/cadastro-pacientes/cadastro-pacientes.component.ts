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
import { ActivatedRoute, Router } from '@angular/router';


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

  pacienteId: string | null = null;
  endereco: any | undefined = undefined;

  constructor(
    private pageTitleService: PageTitleService,
    private consultaCepService: ConsultaCepService,
    private pacientesService: PacientesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

    this.pageTitleService.setPageTitle('CADASTRO DE PACIENTE');
   }
  

pacienteForm = new FormGroup ({
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
    this.pacienteId = params['id'];
    if (this.pacienteId) {
      const paciente = this.pacientesService.obterPacientePorId(this.pacienteId);
      if (paciente) {
        this.pacienteForm.patchValue(paciente);
      }
    }
  });
}


  consultaCEP() {
    const cepValue = this.pacienteForm.get('cep')?.value;
    if (cepValue && cepValue.length === 8) { 
      this.consultaCepService.obterEndereco(cepValue).subscribe(
        {
          next: (response: any) => {
            this.endereco = response;
            this.preencherCamposEndereco(response);
          },
          error: (error: any) => {
            console.error(error);
          }
        }
      );
    }
  }

  preencherCamposEndereco(endereco: any) {
    this.pacienteForm.patchValue({
      cidade: endereco.localidade,
      estado: endereco.uf,
      logradouro: endereco.logradouro,
      bairro: endereco.bairro
    });
  }

  deletarPaciente() {
    if (this.pacienteId) {
      if (confirm('Tem certeza que deseja deletar este paciente?')) {
        this.pacientesService.deletarPacientePorId(this.pacienteId);
        alert('Paciente deletado com sucesso!');
        this.router.navigate(['home'])
      }
    }
  }

  cadastrarPaciente() {
    if (this.pacienteForm.valid) {
      const formData = this.pacienteForm.value;
      if (this.pacienteId) {
        this.pacientesService.atualizarPaciente(this.pacienteId, formData);
        alert('Paciente atualizado com sucesso!');
      } else {
        this.pacientesService.salvarPaciente(formData);
        alert('Paciente cadastrado com sucesso!');
      }
    }
  }

  editarPaciente() {
    if (this.pacienteForm.valid && this.pacienteId) {
      const pacienteFormPreenchido = this.pacienteForm.value;
      this.pacientesService.atualizarPaciente(this.pacienteId, pacienteFormPreenchido);
      alert("Dados do paciente atualizados com sucesso!");
    } else {
      alert('Formulário inválido ou nenhum paciente selecionado.');
    }
  }


}
