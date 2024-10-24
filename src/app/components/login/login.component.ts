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
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup; 
  loginFailed: boolean = false;

  constructor(
    public dialog: MatDialog,
    private readonly userService: UserStorageService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  openDialog(): void {
    this.dialog.open(SingupComponent, {
      width: '260px', 
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
                console.log('Resposta do login:', response);
                
                const perfil = response.listaNomesPerfis && response.listaNomesPerfis.length > 0
                    ? response.listaNomesPerfis[0] 
                    : ''; 

                this.userService.setProfile(perfil);

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
      width: '260px', 
    });
  }
}
