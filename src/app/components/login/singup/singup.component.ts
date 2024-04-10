import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
    ReactiveFormsModule
  ],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
export class SingupComponent {

  constructor(
    public dialogRef: MatDialogRef<SingupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  
  fullName: string | null | undefined;
  email: string | null | undefined;
  password: string | null | undefined;
  confirmPassword: string | null | undefined;

  signupForm = new FormGroup ({
    fullName: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(64)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(9)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(9)])
  })


  submit(){

  }


  onNoClick(): void {
    this.dialogRef.close();
  }
}
