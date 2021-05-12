import { Component, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { User } from '@models/user';
import { Observable } from 'rxjs';

import { RoleFormComponent } from '../components/role-form/role-form.component';
import { RoleListComponent } from '../components/role-list/role-list.component';
import { RolesFacade } from '../roles.facade';

@Component({
  selector: 'Roles',
  templateUrl: './Roles.component.html',
  styleUrls: ['./Roles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesComponent {

  newRole: User = new User();
  Roles$: Observable<User[]>;
  isUpdating$: Observable<boolean>;

  @ViewChild(RoleFormComponent, { static: false })
  RoleForm: RoleFormComponent;

  @ViewChild(RoleListComponent, { static: true })
  RoleList: RoleListComponent;

  constructor(private RolesFacade: RolesFacade) {
    this.isUpdating$ = RolesFacade.isUpdating$();
    this.Roles$ = RolesFacade.getUsers$();
  }

  addRole(Role: User) {
    this.RolesFacade.addUser(Role);
  }

  updateRole(Role: User) {
    this.RolesFacade.updateUser(Role);
  }

  isAnyFormDirty() {
    return this.RoleForm?.isDirty() || this.RoleList.isAnyFormDirty();
  }

}
