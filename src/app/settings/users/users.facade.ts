import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { UserApi } from '../../shared/api/user.api';
import { UsersState } from './users.state';

@Injectable()
export class UsersFacade {

  constructor(private userApi: UserApi, private usersState: UsersState) { }

  isUpdating$(): Observable<boolean> {
    return this.usersState.isUpdating$();
  }

  getUsers$(): Observable<User[]> {
    // here we just pass the state without any projections
    // it may happen that it is necessary to combine two or more streams and expose to the components
    return this.usersState.getUsers$();
  }

  loadUsers() {
    return this.userApi.getUsers()
      .pipe(tap(users => this.usersState.setUsers(users)));
  }

  // optimistic update
  // 1. update UI Model
  // 2. call API
  addUser(user: User) {
    this.usersState.addUser(user);
    this.userApi.createUser(user)
      .subscribe(
        (addedUserWithId: User) => this.usersState.updateUserId(user, addedUserWithId),
        (error: any) => {
          this.usersState.removeUser(user);
          console.log(error);
        }
      );
  }

  // pessimistic update
  // 1. call API
  // 2. update UI model
  updateUser(user: User) {
    this.usersState.setUpdating(true);
    this.userApi.updateUser(user)
      .subscribe(
        () => this.usersState.updateUser(user),
        (error) => console.log(error),
        () => this.usersState.setUpdating(false)
      );
  }

}
