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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  signupForm: FormGroup | undefined;
  forgotPasswordForm: FormGroup | undefined;
  usersList: any = [];
  fullName: string | undefined;

  constructor(
    public dialog: MatDialog,
    private readonly userService: UserStorageService,
    private readonly router: Router
  ) {}


  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  openDialog(): void {
    this.dialog.open(SingupComponent, {
      data: { signupForm: this.signupForm },
    });
  }

  login() {
    const password = this.loginForm.value.password;
    const signedUser = this.signedUser();
    if (signedUser && password === signedUser.password) {
      this.userService.setLoggedUser(signedUser);
      this.router.navigate(['home']);
      alert('Entrou');
    } else {
      alert('Email ou senha incorretos');
    }
  }

  signedUser() {
    let usersList = this.userService.getUsers();
    return usersList.find(
      (usuario: { email: string }) =>
        usuario.email === this.loginForm.value.email
    );
  }

  forgotPassword() {
    this.dialog.open(ForgotPasswordComponent, {
      data: { forgotPasswordForm: this.forgotPasswordForm },
    });
  }
}
