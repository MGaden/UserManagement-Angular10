import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output, ViewChildren, QueryList } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';

import { Observable } from 'rxjs';
import { User } from '@models/user';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent {

  @Input()
  users$: Observable<User[]>;

  @Output()
  userUpdated: EventEmitter<User> = new EventEmitter();

  @ViewChildren(UserFormComponent)
  userForms: QueryList<UserFormComponent>;

  updateUser(user: User) {
    this.userUpdated.emit(user);
  }

  isAnyFormDirty() {
    return this.userForms.reduce((reduced, form) => form.isDirty() || reduced, false);
  }

}
