import { Component } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SingupComponent } from './singup/singup.component';
import { UserStorageService } from '../../services/users-storage.service';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/authservice.service';
import { LoginResponse } from '../../entities/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Corrigido para styleUrls
})
export class LoginComponent {
  loginForm: FormGroup; // Declarando o formulário de login
  loginFailed: boolean = false; // Para controlar se o login falhou

  constructor(
    public dialog: MatDialog,
    private readonly userService: UserStorageService,
    private readonly router: Router,
    private readonly authService: AuthService // Usando AuthService
  ) {
    // Inicializando o formulário de login
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  openDialog(): void {
    this.dialog.open(SingupComponent, {
      width: '400px', // Ajuste a largura conforme necessário
    });
  }

  login() {
    if (this.loginForm.invalid) {
        return;
    }

    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    this.authService.login({ email, password }).subscribe({
        next: (response) => {
            if (response && response.token) {
                this.userService.setToken(response.token);

                // Verifique a resposta do servidor
                console.log('Resposta do login:', response);

                // Definindo o perfil a partir do listaNomesPerfis, se existir
                const perfil = response.listaNomesPerfis && response.listaNomesPerfis.length > 0
                    ? response.listaNomesPerfis[0] // Pega o primeiro perfil da lista
                    : ''; // Se não houver perfis, define como string vazia

                this.userService.setProfile(perfil); // Armazenando o perfil

                this.router.navigate(["home"]);
            } else {
                console.error("Resposta de login inválida: ", response);
                this.loginFailed = true;
            }
        },
        error: (error) => {
            alert("Usuário ou senha inválidos");
            console.error("Erro ao fazer o login", error);
            this.loginFailed = true;
        }
    });
}

  
  forgotPassword() {
    this.dialog.open(ForgotPasswordComponent, {
      width: '400px', // Ajuste a largura conforme necessário
    });
  }
}
