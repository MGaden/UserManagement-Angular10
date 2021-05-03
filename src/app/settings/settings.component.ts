import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { UsersComponent } from './users/container/users.component';
import { User } from '@models/user';

@Component({
  selector: 'settings',
  template: `
    <nav mat-tab-nav-bar>
      <a mat-tab-link *ngFor="let item of menuItems" [routerLink]="item"
        routerLinkActive #link="routerLinkActive"
        [active]="link.isActive">{{ item | titlecase }}</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class SettingsComponent implements OnInit {

  @ViewChild(UsersComponent)
  usersComponent: UsersComponent;
  forms: FormGroup[] = [];
  users$: Observable<User[]>;
  menuItems = ['account', 'users'];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.navigate(['account'], { relativeTo: this.route });
  }

}
