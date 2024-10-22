import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SingupComponent } from './singup/singup.component';
import { UserStorageService } from '../../services/users-storage.service';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { User } from '../../entities/user.model';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  signupForm: FormGroup | undefined;
  forgotPasswordForm: FormGroup | undefined;
  usersList: any = [];
  fullName: string | undefined;
  loginFailed: any;

  constructor(
    public dialog: MatDialog,
    private readonly userService: UserStorageService,
    private readonly router: Router,
    private readonly loginService: LoginService
  ) {}


  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  openDialog(): void {
    this.dialog.open(SingupComponent, {
      data: { signupForm: this.signupForm },
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    this.loginService.login({ email, password }).subscribe({
      next: (response: { token: string, tempoExpiracao: number }) => {
        if (response && response.token) {
          this.userService.setToken(response.token);
          this.router.navigate(["home"]);
        } else {
          console.error("Resposta de login inválida: ", response);
          this.loginFailed = true;
        }
      },
      error: (error: any) => {
        alert("Usuário ou senha inválidos")
        // console.error("Erro ao fazer o login", error);
        this.loginFailed = true;
      }
      // ,
      // complete: () => {
      //     console.log("Requisição de login completa")
      // }
    });
  }
  

  forgotPassword() {
    this.dialog.open(ForgotPasswordComponent, {
      data: { forgotPasswordForm: this.forgotPasswordForm },
    });
  }
}
