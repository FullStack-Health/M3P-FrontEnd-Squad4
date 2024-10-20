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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid';


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
    MatSnackBarModule
  ],
  templateUrl: './cadastro-pacientes.component.html',
  styleUrls: ['./cadastro-pacientes.component.scss']
})
export class CadastroPacientesComponent implements OnInit {

  pacienteForm: FormGroup;
  pacienteId: string | null = null;
  endereco: any | undefined = undefined;

  constructor(
    private readonly pageTitleService: PageTitleService,
    private readonly consultaCepService: ConsultaCepService,
    private readonly pacientesService: PacientesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar // Correção: Serviço MatSnackBar
  ) {
    this.pageTitleService.setPageTitle('CADASTRO DE PACIENTE');

    this.pacienteForm = new FormGroup({
      nomeCompleto: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      genero: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      rg: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      orgaoExpedidor: new FormControl('', Validators.required),
      estadoCivil: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      naturalidade: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
      contatoEmergencia: new FormControl('', [Validators.required]),
      alergias: new FormControl(''),
      cuidadosEspecificos: new FormControl(''),
      convenio: new FormControl(''),
      numeroConvenio: new FormControl(''),
      validadeConvenio: new FormControl(''),
      cep: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      cidade: new FormControl({ value: '', disabled: true }),
      estado: new FormControl({ value: '', disabled: true }),
      logradouro: new FormControl({ value: '', disabled: true }),
      numero: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl({ value: '', disabled: true }),
      pontoReferencia: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.verificarAcesso();

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

  verificarAcesso(): void {
    const perfilUsuario = localStorage.getItem('perfil');
    if (perfilUsuario !== 'admin' && perfilUsuario !== 'medico') {
      alert('Acesso não autorizado!');
      this.router.navigate(['home']);
    }
  }

  consultaCEP(): void {
    const cepValue = this.pacienteForm.get('cep')?.value;
    if (cepValue && cepValue.length === 8) {
      this.consultaCepService.obterEndereco(cepValue).subscribe({
        next: (response: any) => {
          this.endereco = response;
          this.preencherCamposEndereco(response);
        },
        error: (error: any) => console.error('Erro ao consultar CEP', error)
      });
    }
  }

  preencherCamposEndereco(endereco: any): void {
    this.pacienteForm.patchValue({
      cidade: endereco.localidade,
      estado: endereco.uf,
      logradouro: endereco.logradouro,
      bairro: endereco.bairro
    });
  }

  cadastrarPaciente(): void {
    if (this.pacienteForm.valid) {
      const formData = this.pacienteForm.value;

      if (this.pacienteId) {
        this.pacientesService.atualizarPaciente(this.pacienteId, formData);
        this.exibirMensagem('Paciente atualizado com sucesso!');
      } else {
        formData.id = uuidv4();
        this.pacientesService.salvarPaciente(formData);
        this.exibirMensagem('Paciente cadastrado com sucesso!');
        this.router.navigate(['home']);
      }
    }
  }

  deletarPaciente(): void {
    if (this.pacienteId && confirm('Tem certeza que deseja deletar este paciente?')) {
      this.pacientesService.deletarPacientePorId(this.pacienteId);
      this.exibirMensagem('Paciente deletado com sucesso!');
      this.router.navigate(['home']);
    }
  }

  exibirMensagem(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', { duration: 3000 });
  }
}