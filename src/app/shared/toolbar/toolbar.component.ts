import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/users-storage.service';
import { PageTitleService } from '../../services/title.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  pageTitle = this.pageTitleService.getPageTitle();

  loggedUser: any;

  constructor(private userService: UserService, private pageTitleService: PageTitleService) {}

  ngOnInit() {
    this.loggedUser = this.userService.getLoggedUser();
  }
}