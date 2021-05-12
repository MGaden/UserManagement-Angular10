import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output, ViewChildren, QueryList } from '@angular/core';
import { RoleFormComponent } from '../role-form/role-form.component';

import { Observable } from 'rxjs';
import { User } from '@models/user';

@Component({
  selector: 'Role-list',
  templateUrl: './Role-list.component.html',
  styleUrls: ['./Role-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleListComponent {

  @Input()
  Roles$: Observable<User[]>;

  @Output()
  RoleUpdated: EventEmitter<User> = new EventEmitter();

  @ViewChildren(RoleFormComponent)
  RoleForms: QueryList<RoleFormComponent>;

  updateRole(Role: User) {
    this.RoleUpdated.emit(Role);
  }

  isAnyFormDirty() {
    return this.RoleForms.reduce((reduced, form) => form.isDirty() || reduced, false);
  }

}
