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
    private readonly usersService: UserStorageService
  ) {}

  email: string | null | undefined;
  profile: string | null | undefined;
  password: string | null | undefined;
  confirmPassword: string | null | undefined;

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required,
      Validators.email]),
    profile: new FormControl('', [
      Validators.required
    ]),
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
      alert("Usuário cadastrado com sucesso!")
      console.log('Dados do formulário:', formData);

      this.usersService.addUser(formData).subscribe({
        next: (response) => {
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
}
