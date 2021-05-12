import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserApi } from '../../shared/api/user.api';
import { RolesState } from './roles.state';

@Injectable()
export class RolesFacade {

  constructor(private UserApi: UserApi, private UsersState: RolesState) { }

  isUpdating$(): Observable<boolean> {
    return this.UsersState.isUpdating$();
  }

  getUsers$(): Observable<User[]> {
    // here we just pass the state without any projections
    // it may happen that it is necessary to combine two or more streams and expose to the components
    return this.UsersState.getUsers$();
  }

  loadUsers() {
    return this.UserApi.getUsers()
      .pipe(tap(Users => this.UsersState.setUsers(Users)));
  }

  // optimistic update
  // 1. update UI Model
  // 2. call API
  addUser(User: User) {
    this.UsersState.addUser(User);
    this.UserApi.createUser(User)
      .subscribe(
        (addedUserWithId: User) => this.UsersState.updateUserId(User, addedUserWithId),
        (error: any) => {
          this.UsersState.removeUser(User);
          console.log(error);
        }
      );
  }

  // pessimistic update
  // 1. call API
  // 2. update UI model
  updateUser(User: User) {
    this.UsersState.setUpdating(true);
    this.UserApi.updateUser(User)
      .subscribe(
        () => this.UsersState.updateUser(User),
        (error) => console.log(error),
        () => this.UsersState.setUpdating(false)
      );
  }

}
