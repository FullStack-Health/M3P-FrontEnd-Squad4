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
      this.pacientesService.obterPacientePorId(this.pacienteId).subscribe({
        next: (paciente) => {
          if (paciente) {
            this.pacienteForm.patchValue(paciente); // Popula o formulário com os dados do paciente
          } else {
            console.error('Paciente não encontrado');
          }
        },
        error: (error) => {
          console.error('Erro ao carregar paciente:', error);
        }
      });
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

  removerMascara(valor: string): string {
    return valor.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  }
  
  formatarTelefone(valor: string): string {
    // Formata o número de telefone no formato (XX)XXXXX-XXXX
    return valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3');
  }
  
  formatarCPF(valor: string): string {
    // Formata o CPF no formato XXX.XXX.XXX-XX
    return valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }
  
  cadastrarPaciente() {
    console.log('Iniciando o cadastro do paciente', this.pacienteForm.value);
  
    // Verificar o valor de 'nomeCompleto'
    console.log('Valor de nomeCompleto:', this.pacienteForm.value.nomeCompleto);
  
    if (this.pacienteForm.valid) {
      // Crie uma cópia do formData com as máscaras removidas e depois formate para o backend
      let formData = {
        ...this.pacienteForm.value,
        nome: this.pacienteForm.value.nomeCompleto, // Ajuste o nome se o backend espera um campo chamado 'nome'
        cpf: this.formatarCPF(this.removerMascara(this.pacienteForm.value.cpf ?? '')),
        telefone: this.formatarTelefone(this.removerMascara(this.pacienteForm.value.telefone ?? '')),
        contatoEmergencia: this.formatarTelefone(this.removerMascara(this.pacienteForm.value.contatoEmergencia ?? ''))
      };
  
      if (this.pacienteId) {
        console.log(`Atualizando paciente com ID: ${this.pacienteId}`);
        this.pacientesService.atualizarPaciente(this.pacienteId, formData).subscribe({
          next: () => {
            this.snackBar.open('Paciente atualizado com sucesso!', 'Fechar', { duration: 3000 });
          },
          error: (error) => {
            console.error('Erro ao atualizar paciente:', error);
            this.snackBar.open('Erro ao atualizar paciente.', 'Fechar', { duration: 3000 });
          }
        });
      } else {
        console.log('Salvando novo paciente', formData);
        this.pacientesService.salvarPaciente(formData).subscribe({
          next: () => {
            this.snackBar.open('Paciente cadastrado com sucesso!', 'Fechar', { duration: 3000 });
            this.router.navigate(['home']);
          },
          error: (error) => {
            console.error('Erro ao cadastrar paciente:', error);
            this.snackBar.open('Erro ao cadastrar paciente.', 'Fechar', { duration: 3000 });
          }
        });
      }
    } else {
      console.warn('Formulário inválido:', this.pacienteForm.errors);
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
