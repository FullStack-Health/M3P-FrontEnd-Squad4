import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { SingupComponent } from './singup/singup.component';
import { UserService } from '../../services/users-storage.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  signupForm: FormGroup | undefined;
  usersList: any = [];
  router: any;
  fullName: string | undefined;
  
  constructor(public dialog: MatDialog, private userService: UserService) {}
  
  ngOnInit(): void {
 
  };

  loginForm = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(9)]),
  });

  openDialog(): void {
    const dialogRef = this.dialog.open(SingupComponent, {
      data: {signupForm: this.signupForm},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  };

  
    
  login(){
    const password = this.loginForm.value.password;
    const signedupUser = this.signedupUser();
    // se email && senha estiverem válidos
    if (signedupUser && password === signedupUser.password){
      this.userService.setLoggedUser(signedupUser);
        alert("Entrou na home")
        this.router.navigate('home');
      } else {
        alert("Email ou senha incorretos");
      }
    };


    signedupUser(){
      let usersList = this.userService.getUsers();
      return usersList.find((usuario: { email: string }) => usuario.email === this.loginForm.value.email);
  };


  forgotPassword(){
    alert("Funcionalidade em construção")
  }



}