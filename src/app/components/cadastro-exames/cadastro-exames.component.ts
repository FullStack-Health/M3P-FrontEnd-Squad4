import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/title.service';

@Component({
  selector: 'app-cadastro-exames',
  standalone: true,
  imports: [],
  templateUrl: './cadastro-exames.component.html',
  styleUrl: './cadastro-exames.component.scss'
})
export class CadastroExamesComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) {}

  ngOnInit(): void {
    this.pageTitleService.setPageTitle('CADASTRO DE EXAMES');
  }
}
