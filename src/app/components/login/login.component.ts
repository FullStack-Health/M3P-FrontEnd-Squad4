import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  formLogin = new FormGroup ({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })
  router: any;


  
  submit(){
    // se email && senha estiverem válidos && se usuário for localizado no localStorage -> redireciona para 'home'
    this.router.navigate('home')
  }

  createAccount(){
    // abre um modal com um formulário para criar o usuário com campos obrigatórios email válido, senha e confirmar senha, verificar se senhas são iguais e têm mais de 8 caracteres e salvar usuário no localStorage
  }

  forgotPassword(){
    // usar toast ou alert avisando que funcionalidade está em construção
  }



}
