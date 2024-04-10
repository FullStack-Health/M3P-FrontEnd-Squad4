import {Component, Inject} from '@angular/core';
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

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsersStorage();
    this.createUserTest();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SingupComponent, {
      data: {signupForm: this.signupForm},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  
  // loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

loginForm = new FormGroup ({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.maxLength(9)]),
})
  router: any;
  fullName: string | undefined;
  email: any;



  createUserTest() {
    const users = this.getUsersStorage();
    const testUser = {
      email: 'andre@gmail.com',
      password: '123'
    };
    localStorage.setItem('testUser', JSON.stringify(testUser));
    const findUser = users.find((user: {email: string }) => user.email === users.email);
    if(!findUser){
      users.push(testUser);
      localStorage.setItem('users', JSON.stringify(users));

    }
  }

  getUsersStorage(){
    const users = localStorage.getItem('users');
    if(!!users) {
      return JSON.parse(users);
    } else {
      localStorage.setItem('users', JSON.stringify([]));
      return [];
    };
  }

  submit(){
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    const users = this.getUsersStorage();
    const signedupUser = users.find((user: {email: string})=> user.email === email);
    // se email && senha estiverem válidos
    if (signedupUser && password === signedupUser.password){
        alert("Entrou na home")
        this.router.navigate('home');
      } else {
        alert("Email ou senha incorretos");
      }
      //  && se usuário for localizado no localStorage -> redireciona para 'home'
    }

  

  

  forgotPassword(){
    alert("Funcionalidade em construção")
  }



}