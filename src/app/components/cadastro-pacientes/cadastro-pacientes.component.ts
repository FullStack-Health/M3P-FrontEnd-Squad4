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
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private readonly pageTitleService: PageTitleService,
    private readonly consultaCepService: ConsultaCepService,
    private readonly pacientesService: PacientesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private snackBar: MatSnackBar // Adicionando MatSnackBar ao construtor
  ) {

    this.pageTitleService.setPageTitle('CADASTRO DE PACIENTE');
   }
  

pacienteForm = new FormGroup ({
  nomeCompleto: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
  genero: new FormControl('', [Validators.required]),
  dataNascimento: new FormControl('', [Validators.required]),
  cpf: new FormControl('', [Validators.required,Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]), // Adicionado validação de CPF
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
          error: (error: any) => {''
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

        // Substituído o `alert` pelo `snackBar` para uma notificação menos intrusiva
        this.snackBar.open('Paciente deletado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['home']);
      }
    }
  }

  cadastrarPaciente() {
    if (this.pacienteForm.valid) {
      const formData = this.pacienteForm.value;
      if (this.pacienteId) {
        this.pacientesService.atualizarPaciente(this.pacienteId, formData);

        // Usando o `snackBar` em vez de `alert` para uma notificação visual mais moderna
        this.snackBar.open('Paciente atualizado com sucesso!', 'Fechar', { duration: 3000 });
      } else {
        this.pacientesService.salvarPaciente(formData);

        // `snackBar` também aqui para manter consistência visual em toda a aplicação
        this.snackBar.open('Paciente cadastrado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['home']);
      }
    }
  }

  editarPaciente() {
    if (this.pacienteForm.valid && this.pacienteId) {
      const pacienteFormPreenchido = this.pacienteForm.value;
      this.pacientesService.atualizarPaciente(this.pacienteId, pacienteFormPreenchido);

      // Notificação usando `snackBar` ao invés de `alert`, garantindo uma experiência de usuário consistente
      this.snackBar.open('Dados do paciente atualizados com sucesso!', 'Fechar', { duration: 3000 });
    } else {
      // Mensagem de erro também usando `snackBar`
      this.snackBar.open('Formulário inválido ou nenhum paciente selecionado.', 'Fechar', { duration: 3000 });
    }
  }

  //Função auxiliar para verificar se o campo tem erro e exibir a mensagem adequada
  getErrorMessage(controlName: string) {
    const control = this.pacienteForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Campo obrigatório';
    } else if (control?.hasError('minlength')) {
      return 'Mínimo de carecetes não atingido';
    } else if (control?.hasError('maxlength')) {
      return 'Máximo de caracteres excedido';
    } else if (control?.hasError('pattern')) {
      return 'Formato inválido';
    } else if (control?.hasError('email')) {
      return 'E-mail inválido';
    }
    return '';
  }

}
