import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserStorageService } from '../../../services/users-storage.service';
import { User } from '../../../entities/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss',
})
export class SingupComponent {
  constructor(
    public dialogRef: MatDialogRef<SingupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly usersService: UserStorageService,
    private readonly snackBar: MatSnackBar
  ) {}

  user: User | undefined;

  email: string | null | undefined;
  nomePerfil: string | null | undefined;
  password: string | null | undefined;
  confirmPassword: string | null | undefined;

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nomePerfil: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  submit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      console.log('Dados do formulário:', formData);
      
      // console.log('Dados do formulário:', formData);
      this.usersService.getUsers().subscribe((user: any) => {
        if (user[0].email === formData.email) {
          this.snackBar.open('Email já cadastrado', 'Fechar', { duration: 5000 });
        }
      });  

      this.usersService.addUser(formData).subscribe({
        next: (response) => {
          alert("Usuário cadastrado com sucesso!");
          console.log("Usuário cadastrado com sucesso: ", response);
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Erro ao cadastrar usuário: ', err);
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checarEmail(email: string) {
    this.usersService.getUsers().subscribe((user: any) => {
      const emailForm = this.signupForm.get(email)?.value
      if (user[0].email === emailForm) {
        console.log('entrou')
        this.snackBar.open('Email já cadastrado', 'Fechar', { duration: 5000 });
      }
    });  
  }
}
