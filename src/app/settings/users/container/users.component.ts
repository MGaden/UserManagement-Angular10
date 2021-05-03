import { Component, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { User } from '@models/user';
import { Observable } from 'rxjs';

import { UserFormComponent } from '../components/user-form/user-form.component';
import { UserListComponent } from '../components/user-list/user-list.component';
import { UsersFacade } from '../users.facade';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {

  newUser: User = new User();
  users$: Observable<User[]>;
  isUpdating$: Observable<boolean>;

  @ViewChild(UserFormComponent, { static: false })
  userForm: UserFormComponent;

  @ViewChild(UserListComponent, { static: true })
  userList: UserListComponent;

  constructor(private usersFacade: UsersFacade) {
    this.isUpdating$ = usersFacade.isUpdating$();
    this.users$ = usersFacade.getUsers$();
  }

  addUser(user: User) {
    this.usersFacade.addUser(user);
  }

  updateUser(user: User) {
    this.usersFacade.updateUser(user);
  }

  isAnyFormDirty() {
    return this.userForm?.isDirty() || this.userList.isAnyFormDirty();
  }

}
