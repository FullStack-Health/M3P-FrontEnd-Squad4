import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from '../../models/paciente.model';
import { Endereco } from '../../models/endereco.model';
import { User } from '../../models/user.model';
import { formatDataNascimento } from '../../utils/formatDataNascimento.format';
import { ConsultaCepService } from '../../services/consulta-cep.service';

@Component({
  selector: 'app-cadastro-pacientes',
  templateUrl: './cadastro-pacientes.component.html',
  styleUrls: ['./cadastro-pacientes.component.scss']
})
export class CadastroPacientesComponent implements OnInit {
  pacienteForm: FormGroup;
  pacienteId: string | null = null;
  mostrar: boolean = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly pageTitleService: PageTitleService,
    private readonly consultaCepService: ConsultaCepService,
    private readonly pacientesService: PacientesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.activatedRoute.paramMap.subscribe(params => {
      this.pacienteId = params.get('id');
      this.mostrar = !this.pacienteId;
      if (this.pacienteId) {
        this.carregarPaciente(this.pacienteId);
      }
    });
  }

  initializeForm(): void {
    this.pacienteForm = this.fb.group({
      nome: ['', Validators.required],
      genero: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      rg: ['', Validators.required],
      orgaoExpedidor: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\d{4,5}-\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      naturalidade: ['', Validators.required],
      contatoEmergencia: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\d{4,5}-\d{4}$/)]],
      listaAlergias: [''],
      listaCuidados: [''],
      convenio: [''],
      numeroConvenio: [''],
      validadeConvenio: [''],
      endereco: this.fb.group({
        cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        rua: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        bairro: ['', Validators.required],
        ptoReferencia: ['']
      }),
      usuario: this.fb.group({
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dataNascimento: ['', Validators.required],
        cpf: ['', Validators.required],
        telefone: ['', Validators.required],
        password: ['', Validators.required],
        listaNomesPerfis: [[]],
        senhaComMascara: ['']
      })
    });
  }

  carregarPaciente(id: string): void {
    this.pacientesService.getPacientePorId(id).subscribe({
      next: (paciente: Paciente) => {
        console.log(paciente);

        const dataNascimento = new Date(paciente.dataNascimento).toISOString().split('T')[0];
        const validadeConvenio = new Date(paciente.validadeConvenio).toISOString().split('T')[0];
        const usuarioDataNascimento = new Date(paciente.validadeConvenio).toISOString().split('T')[0];

        this.pacienteForm.patchValue({
          ...paciente,
          dataNascimento,
          validadeConvenio,
          usuario: {
            ...paciente.usuario,
            dataNascimento: usuarioDataNascimento
          },
          endereco: {
            ...paciente.endereco
          }
        });
      },
      error: (error) => {
        console.error('Erro ao carregar paciente:', error);
        this.snackBar.open('Erro ao carregar paciente. Tente novamente.', 'Fechar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    });
  }

  consultaCEP() {
    const cepValue = this.pacienteForm.get('endereco.cep')?.value;
    if (cepValue && cepValue.length === 8) {
      this.consultaCepService.obterEndereco(cepValue).subscribe({
        next: (response: any) => {
          this.endereco = response;
          this.preencherCamposEndereco(response);
        },
        error: (error: any) => {
          console.error('Erro ao buscar endereço:', error);
        }
      });
    }
  }

  preencherCamposEndereco(endereco: any) {
    this.pacienteForm.patchValue({
      endereco: {
        cep: endereco.cep,
        cidade: endereco.cidade,
        estado: endereco.estado,
        rua: endereco.rua,
        numero: endereco.numero,
        complemento: endereco.complemento,
        bairro: endereco.bairro,
        ptoReferencia: endereco.ptoReferencia
      }
    });
  }

  cadastrarPaciente(): void {
    if (this.pacienteForm.valid) {
      const formData = this.pacienteForm.value;

      // Formatar os campos antes de enviar para o backend
      formData.cpf = this.formatarCPF(formData.cpf);
      formData.telefone = this.formatarTelefone(formData.telefone);
      formData.contatoEmergencia = this.formatarTelefone(formData.contatoEmergencia);
      formData.endereco.cep = this.formatarCEP(formData.endereco.cep);

      const pacienteData: Paciente = {
        ...formData,
        id: 0, // ou qualquer valor padrão
        nome: formData.nome!,
        listaAlergias: formData.listaAlergias ? formData.listaAlergias.split(',') : [],
        listaCuidados: formData.listaCuidados ? formData.listaCuidados.split(',') : [],
        // adicionar outras propriedades necessárias com valores padrão, se necessário
      } as unknown as Paciente;

      this.pacientesService.addPaciente(pacienteData).subscribe({
        next: (paciente: Paciente) => {
          console.log('Paciente cadastrado:', paciente);
          this.snackBar.open('Paciente cadastrado com sucesso!', 'OK', { duration: 5000 });
          this.router.navigate(['home']);
        },
        error: (error: any) => {
          console.error('Erro ao cadastrar paciente:', error);
          this.snackBar.open('Erro ao cadastrar paciente. Tente novamente.', 'OK', { duration: 5000 });
        }
      });
    } else {
      console.error('Formulário inválido');
      this.snackBar.open('Formulário inválido. Verifique os campos e tente novamente.', 'OK', { duration: 5000 });
    }
  }

  formatarCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarTelefone(telefone: string): string {
    return telefone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1)$2-$3');
  }

  formatarCEP(cep: string): string {
    return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
  }

  deletarPaciente() {
    console.log("pacienteId", this.pacienteId);
    if (this.pacienteId) {
      const snackBarRef = this.snackBar.open(
        'Tem certeza que deseja deletar esse paciente?',
        'CONFIRMAR',
        {
          duration: 5000,
        }
      );

      snackBarRef.onAction().subscribe(() => {
        this.pacientesService.deletePaciente(this.pacienteId!).subscribe({
          next: () => {
            this.snackBar.open('Paciente deletado com sucesso!', 'OK', {
              duration: 5000,
            });
            this.router.navigate(['home']);
          },
          error: (err) => {
            console.error('Erro ao deletar paciente:', err);
            this.snackBar.open(
              'Erro ao deletar paciente. Tente novamente.',
              'OK',
              { duration: 5000 }
            );
          }
        });
      });
    } else {
      console.error('ID do paciente não encontrado para exclusão.');
    }
  }

  editarPaciente() {
    if (this.pacienteForm.valid && this.pacienteId) {
      const formData = this.pacienteForm.value;

      const pacienteData: any = {
        ...formData,
        id: Number(this.pacienteId),
        nome: formData.nome!,
        listaAlergias: formData.alergias ? formData.alergias.split(',') : [],
        listaCuidados: formData.cuidadosEspecificos ? formData.cuidadosEspecificos.split(',') : []
      };

      this.pacientesService.updatePaciente(this.pacienteId, pacienteData).subscribe({
        next: (paciente: Paciente) => {
          console.log('Paciente atualizado:', paciente);
          this.snackBar.open('Paciente atualizado com sucesso!', 'OK', { duration: 5000 });
          this.router.navigate(['home']);
        },
        error: (error: any) => {
          console.error('Erro ao atualizar paciente:', error);
          this.snackBar.open('Erro ao atualizar paciente. Tente novamente.', 'OK', { duration: 5000 });
        }
      });
    }
  }
}