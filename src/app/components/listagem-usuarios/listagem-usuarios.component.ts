import { Component } from '@angular/core';
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
export class ListagemUsuariosComponent {

  displayedColumns: string[] = ['id', 'email', 'password', 'acao'];
  usersList: any[] = [];
  textoPesquisa: any;

  constructor(
    private readonly pageTitleService: PageTitleService,
    private readonly userStorageService: UserStorageService,
    private readonly router: Router
    ) {  
      this.pageTitleService.setPageTitle('LISTAGEM DE USUÁRIOS');
      this.atualizarListaUsuarios();
  }

  atualizarListaUsuarios() {
    this.userStorageService.getUsers().subscribe(users => {
      this.usersList = users;
    });
  }

  pesquisarUsuarios(textoPesquisa: string) {
    if (!this.textoPesquisa) {
      this.atualizarListaUsuarios();
    } else {
      this.userStorageService.getUserByEmailOrById(textoPesquisa).subscribe(users => {
        this.usersList = users;
      });
    }
  }

  editarUsuario(usuario: any) {
    this.router.navigate(['/usuarios', usuario.id]);
  }

}
