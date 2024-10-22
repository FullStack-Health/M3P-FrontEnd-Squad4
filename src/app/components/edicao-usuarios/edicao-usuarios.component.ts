import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { PageTitleService } from '../../services/title.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from '../../services/users-storage.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edicao-usuarios',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  templateUrl: './edicao-usuarios.component.html',
  styleUrl: './edicao-usuarios.component.scss'
})
export class EdicaoUsuariosComponent implements OnInit  {

    userId: string | null = null;
    
    constructor(
      private readonly pageTitleService: PageTitleService,
      private readonly userStorageService: UserStorageService,
      private readonly activatedRoute: ActivatedRoute,
      private readonly router: Router,
      private readonly _snackBar: MatSnackBar
    ) {
  
      this.pageTitleService.setPageTitle('EDIÇÃO DE USUÁRIOS');
     }
      
  userForm = new FormGroup ({
    nomeCompleto: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl('', [Validators.required]),
    dataNascimento: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required]),
  });
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
      if (this.userId) {
        this.userStorageService.getUserByEmailOrById(this.userId).subscribe(users => {
          if (users && users.length > 0) {
            const user = users[0];
            this.userForm.patchValue({ email: user.email });
          }
        });
      }
    });
  }
    
    deletarUsuario() {
      if (this.userId) {
        if (confirm('Tem certeza que deseja deletar este usuário?')) {
          this.userStorageService.removeUser(this.userId);
          this._snackBar.open('Usuário deletado com sucesso!', 'OK', {
            duration: 3000
          });
          this.router.navigate(['usuarios']);
         }
      }
    }
  
    editarUsuario() {
      if (this.userForm.valid) {
        const formData = this.userForm.value;
        if (this.userId) {
          this.userStorageService.updateUser(this.userId, formData);
          this._snackBar.open('Usuário atualizado com sucesso!', 'OK', {
            duration: 3000
          });
        } 
      }
    }
  
}
