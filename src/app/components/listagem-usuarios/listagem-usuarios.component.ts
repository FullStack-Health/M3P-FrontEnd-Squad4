import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { PageTitleService } from '../../services/title.service';
import { UserStorageService } from '../../services/users-storage.service';
import { EsconderSenhaPipe } from '../../pipes/esconder-senha.pipe';
import { User } from '../../entities/user.model';

@Component({
  selector: 'app-listagem-usuarios',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    EsconderSenhaPipe
  ],
  templateUrl: './listagem-usuarios.component.html',
  styleUrl: './listagem-usuarios.component.scss'
})
export class ListagemUsuariosComponent implements OnInit {

  usersList: User[] = [];
  displayedColumns: string[] = ['id', 'email', 'senhaComMascara', 'acao'];
  textoPesquisa: any;

  constructor(
    private readonly pageTitleService: PageTitleService,
    private readonly userStorageService: UserStorageService,
    private readonly router: Router
    ) {  
      this.pageTitleService.setPageTitle('LISTAGEM DE USUÁRIOS');
      this.atualizarListaUsuarios();
  }

  ngOnInit() {
    this.atualizarListaUsuarios();
  }

  atualizarListaUsuarios() {
    this.userStorageService.getUsers().subscribe(users => {
      this.usersList = users;
    });
  }

  buscarUsuario(textoPesquisa: string) {
    if (!textoPesquisa) {
      this.atualizarListaUsuarios();
      return;
    }

    const isEmail = textoPesquisa.includes('@');
    const isId = !isNaN(Number(textoPesquisa));

    if (isEmail) {
      this.userStorageService.getUsersByEmail(textoPesquisa).subscribe(users => {
        this.usersList = Array.isArray(users) ? users : [users];
      });
    } else if (isId) {
      this.userStorageService.getUserById(textoPesquisa).subscribe(user => {
        this.usersList = user ? [user] : [];
      });
    } else {
      alert('Por favor, insira um email válido ou um ID.');
      this.usersList = [];
    }
  }

  editarUsuario(usuario: any) {
    this.router.navigate(['/usuarios', usuario.id]);
  }

}
