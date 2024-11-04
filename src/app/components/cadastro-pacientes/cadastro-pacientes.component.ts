import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
<<<<<<< HEAD
=======
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
>>>>>>> develop
import { MatButtonModule } from '@angular/material/button';
import { ConsultaCepService } from '../../services/consulta-cep.service';
import { PageTitleService } from '../../services/title.service';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PacientesService } from '../../services/pacientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
<<<<<<< HEAD
import { Paciente } from '../../entities/paciente.model';
import { Endereco } from '../../entities/endereco.models'
import { Endereco } from '../../entities/endereco.model';
=======
>>>>>>> develop

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
<<<<<<< HEAD
  styleUrl: './cadastro-pacientes.component.scss'
=======
>>>>>>> develop
  styleUrl: './cadastro-pacientes.component.scss',
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
    private readonly snackBar: MatSnackBar // Adicionando MatSnackBar ao construtor
  ) {
    this.pageTitleService.setPageTitle('CADASTRO DE PACIENTE');
<<<<<<< HEAD
   }
  
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
=======
  }

>>>>>>> develop
  pacienteForm = new FormGroup({
    nomeCompleto: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(64),
    ]),
    genero: new FormControl('', [Validators.required]),
    dataNascimento: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    orgaoExpedidor: new FormControl('', Validators.required),
    estadoCivil: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required]),
<<<<<<< HEAD
    email: new FormControl('', [Validators.email]),
=======
    email: new FormControl('', [Validators.required, Validators.email]),
>>>>>>> develop
    naturalidade: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(64),
    ]),
    contatoEmergencia: new FormControl('', [Validators.required]),
<<<<<<< HEAD
    alergias: new FormControl(''),
=======
    alergias: new FormControl('', [Validators.required]),
>>>>>>> develop
    cuidadosEspecificos: new FormControl(''),
    convenio: new FormControl(''),
    numeroConvenio: new FormControl(''),
    validadeConvenio: new FormControl(''),
    cep: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8),
    ]),
    cidade: new FormControl(''),
    estado: new FormControl(''),
    logradouro: new FormControl(''),
    numero: new FormControl(''),
    complemento: new FormControl(''),
    bairro: new FormControl(''),
    pontoReferencia: new FormControl(''),
  });
<<<<<<< HEAD

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.pacienteId = params['id'];
      if (this.pacienteId) {
        this.pacientesService.obterPacientePorId(this.pacienteId).subscribe({
          next: (paciente) => {
            if (paciente) {
              // console.log(paciente.dataNascimento);
              this.carregarPaciente(paciente.id.toString());
              //this.pacienteForm.patchValue(paciente); // Popula o formulário com os dados do paciente
            } else {
              console.error('Paciente não encontrado');
            }
          },
          error: (error) => {
            console.error('Erro ao carregar paciente:', error);
          },
        });
      }
    });
  }

  carregarPaciente(id: string): void {
    this.pacientesService
      .obterPacientePorId(id)
      .subscribe((paciente: any) => {
        console.log(paciente.endereco);

        const date = new Date(paciente.dataNascimento);
        const dataNascimento = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

        const dateConvenio = new Date(paciente.validadeConvenio);
        const validadeConvenio = `${dateConvenio.getFullYear()}-${String(
          dateConvenio.getMonth() + 1
        ).padStart(2, '0')}-${String(dateConvenio.getDate()).padStart(2, '0')}`;

        this.pacienteForm.patchValue({...paciente,
          // nomeCompleto: paciente.nome,
          // genero: paciente.genero,
          dataNascimento: dataNascimento,
          // cpf: paciente.cpf,
          // rg: paciente.rg,
          // orgaoExpedidor: paciente.orgaoExpedidor,
          // estadoCivil: paciente.estadoCivil,
          // telefone: paciente.telefone,
          // email: paciente.email,
          // naturalidade: paciente.naturalidade,
          // contatoEmergencia: paciente.contatoEmergencia,
          // alergias: paciente.listaAlergias || '',
          // cuidadosEspecificos: paciente.listaCuidados || '',
          // convenio: paciente.convenio || '',
          // numeroConvenio: paciente.numeroConvenio || '',
          validadeConvenio: validadeConvenio || '',
          cep: paciente.endereco.cep,
          cidade: paciente.endereco.cidade,
          estado: paciente.endereco.estado,
          logradouro: paciente.endereco.rua,
          numero: paciente.endereco.numero,
          complemento: paciente.endereco.complemento || '',
          bairro: paciente.endereco.bairro,
          pontoReferencia: paciente.endereco.ptoReferencia || '',
        });

        // const date = new Date(paciente.dataNascimento);
        // const dataNascimento = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        // this.pacienteForm.patchValue({
        //   dataNascimento: dataNascimento,
        //   cep: paciente.
        // });
      });
=======

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
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
          },
        });
      }
    });
>>>>>>> develop
  }

  consultaCEP() {
    const cepValue = this.pacienteForm.get('cep')?.value;
<<<<<<< HEAD
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
=======
>>>>>>> develop
    if (cepValue && cepValue.length === 8) {
      this.consultaCepService.obterEndereco(cepValue).subscribe({
        next: (response: any) => {
          this.endereco = response;
          this.preencherCamposEndereco(response);
        },
        error: (error: any) => {
          ('');
          console.error(error);
        },
      });
    }
  }

  preencherCamposEndereco(endereco: any) {
    this.pacienteForm.patchValue({
      cidade: endereco.localidade,
      estado: endereco.uf,
      logradouro: endereco.logradouro,
<<<<<<< HEAD
=======
      bairro: endereco.bairro,
>>>>>>> develop
    });
  }

  deletarPaciente() {
    if (this.pacienteId) {
      if (confirm('Tem certeza que deseja deletar este paciente?')) {
        this.pacientesService.deletarPacientePorId(this.pacienteId);

        // Substituído o `alert` pelo `snackBar` para uma notificação menos intrusiva
<<<<<<< HEAD
=======
        this.snackBar.open('Paciente deletado com sucesso!', 'Fechar', {
          duration: 3000,
        });
>>>>>>> develop
        this.router.navigate(['home']);
      }
    }
  }

  removerMascara(valor: string): string {
    return valor.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  }
<<<<<<< HEAD
  
=======
>>>>>>> develop

  formatarTelefone(valor: string): string {
    // Formata o número de telefone no formato (XX)XXXXX-XXXX
    return valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3');
  }
<<<<<<< HEAD
  
=======
>>>>>>> develop

  formatarCPF(valor: string): string {
    // Formata o CPF no formato XXX.XXX.XXX-XX
    return valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }

<<<<<<< HEAD
  // formatarCEP(valor: string): string {
  //   return valor.replace(/[0-9]+-[0-9]+/i);
  // }

  cadastrarPaciente() {
    console.log('Iniciando o cadastro do paciente', this.pacienteForm.value);
  

    // Verificar o valor de 'nomeCompleto'
    console.log('Valor de nomeCompleto:', this.pacienteForm.value.nomeCompleto);
  
=======
  formatarCEP(valor: string): string {
    // Formata o CEP no formato XXXXX-XXX
    return valor.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }

  cadastrarPaciente() {
    console.log('Iniciando o cadastro do paciente', this.pacienteForm.value);

    // Verificar o valor de 'nomeCompleto'
    console.log('Valor de nomeCompleto:', this.pacienteForm.value.nomeCompleto);
>>>>>>> develop

    if (this.pacienteForm.valid) {
      // Crie uma cópia do formData com as máscaras removidas e depois formate para o backend
      let formData = {
        ...this.pacienteForm.value,
        nome: this.pacienteForm.value.nomeCompleto, // Ajuste o nome se o backend espera um campo chamado 'nome'
        cpf: this.formatarCPF(
          this.removerMascara(this.pacienteForm.value.cpf ?? '')
        ),
        telefone: this.formatarTelefone(
          this.removerMascara(this.pacienteForm.value.telefone ?? '')
        ),
        contatoEmergencia: this.formatarTelefone(
          this.removerMascara(this.pacienteForm.value.contatoEmergencia ?? '')
        ),
<<<<<<< HEAD
        endereco: {
          cep: "88064-730",//this.pacienteForm.value.cep,
          cep: this.pacienteForm.value.cep,//this.pacienteForm.value.cep,
          cidade: this.pacienteForm.value.cidade,
          estado: this.pacienteForm.value.estado,
          logradouro: this.pacienteForm.value.logradouro,
          numero: this.pacienteForm.value.numero,
          complemeto: this.pacienteForm.value.complemento,
          bairro: this.pacienteForm.value.bairro,
          pontoReferencia: this.pacienteForm.value.pontoReferencia
        }
=======

        // Mapeamento correto dos campos para o backend
        listaAlergias: this.pacienteForm.value.alergias || '',
        listaCuidados: this.pacienteForm.value.cuidadosEspecificos || '',

        // Endereço estruturado de forma correta
        endereco: {
          id: 1, // Coloque aqui o ID adequado, se necessário
          cep: this.formatarCEP(
            this.removerMascara(this.pacienteForm.value.cep ?? '')
          ),
          cidade: this.pacienteForm.value.cidade || '',
          estado: this.pacienteForm.value.estado || '',
          rua: this.pacienteForm.value.logradouro || '',
          numero: this.pacienteForm.value.numero || '',
          complemento: this.pacienteForm.value.complemento || '',
          bairro: this.pacienteForm.value.bairro || '',
          ptoReferencia: this.pacienteForm.value.pontoReferencia || '',
        },
>>>>>>> develop
      };

      if (this.pacienteId) {
        console.log(`Atualizando paciente com ID: ${this.pacienteId}`);
<<<<<<< HEAD
        this.pacientesService.atualizarPaciente(this.pacienteId, formData).subscribe({
          next: () => {
            this.snackBar.open('Paciente atualizado com sucesso!', 'Fechar', { duration: 3000 });
          },
          error: (error) => {
            console.error('Erro ao atualizar paciente:', error);
            this.snackBar.open('Erro ao atualizar paciente.', 'Fechar', { duration: 3000 });
          }
        });
=======
        this.pacientesService
          .atualizarPaciente(this.pacienteId, formData)
          .subscribe({
            next: () => {
              this.snackBar.open('Paciente atualizado com sucesso!', 'Fechar', {
                duration: 3000,
>>>>>>> develop
              });
            },
            error: (error) => {
              console.error('Erro ao atualizar paciente:', error);
              this.snackBar.open('Erro ao atualizar paciente.', 'Fechar', {
<<<<<<< HEAD
=======
                duration: 3000,
              });
            },
>>>>>>> develop
          });
      } else {
        console.log('Salvando novo paciente', formData);
        this.pacientesService.salvarPaciente(formData).subscribe({
          next: () => {
<<<<<<< HEAD
=======
            this.snackBar.open('Paciente cadastrado com sucesso!', 'Fechar', {
              duration: 3000,
            });
>>>>>>> develop
            this.router.navigate(['home']);
          },
          error: (error: any) => {
            console.error('Erro ao cadastrar paciente:', error);
            this.snackBar.open('Erro ao cadastrar paciente.', 'Fechar', {
<<<<<<< HEAD
=======
              duration: 3000,
            });
>>>>>>> develop
          },
        });
      }
    } else {
      console.warn('Formulário inválido:', this.pacienteForm.errors);
    }
  }

  editarPaciente() {
    if (this.pacienteForm.valid && this.pacienteId) {
      const pacienteFormPreenchido = this.pacienteForm.value;
<<<<<<< HEAD
      this.pacientesService.atualizarPaciente(this.pacienteId, pacienteFormPreenchido);
      );

      // Notificação usando `snackBar` ao invés de `alert`, garantindo uma experiência de usuário consistente
      this.snackBar.open('Dados do paciente atualizados com sucesso!', 'Fechar', { duration: 3000 });
=======
      this.pacientesService.atualizarPaciente(
        this.pacienteId,
        pacienteFormPreenchido
      );

      // Notificação usando `snackBar` ao invés de `alert`, garantindo uma experiência de usuário consistente
      this.snackBar.open(
        'Dados do paciente atualizados com sucesso!',
        'Fechar',
        { duration: 3000 }
>>>>>>> develop
      );
    } else {
      // Mensagem de erro também usando `snackBar`
      this.snackBar.open(
        'Formulário inválido ou nenhum paciente selecionado.',
        'Fechar',
<<<<<<< HEAD
=======
        { duration: 3000 }
      );
>>>>>>> develop
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
