import { AfterContentInit, Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserStorageService } from '../../services/users-storage.service';
import { PageTitleService } from '../../services/title.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  loggedUser: any;

  pageTitle: string = '';

  private titleSubscription: Subscription | undefined;

  constructor(
    private userService: UserStorageService,
    private pageTitleService: PageTitleService
  ) {
    this.pageTitleService.getPageTitle().subscribe((title) => {
      this.pageTitle = title;
    });
  }

  ngOnInit() {
    this.loggedUser = this.userService.getLoggedUser();
    // this.titleSubscription = this.pageTitleService.getPageTitle().subscribe(title => {
    //   this.pageTitle = title;
    // });
  }

  ngOnDestroy() {
    if (this.titleSubscription) {
      this.titleSubscription.unsubscribe();
    }
  }
}
