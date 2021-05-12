import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RolesState {

  private updating$ = new BehaviorSubject<boolean>(false);
  private users$ = new BehaviorSubject<User[]>(null);

  isUpdating$() {
    return this.updating$.asObservable();
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  getUsers$() {
    return this.users$.asObservable();
  }

  setUsers(users: User[]) {
    this.users$.next(users);
  }

  addUser(user: User) {
    const currentValue = this.users$.getValue();
    this.users$.next([...currentValue, user]);
  }

  updateUser(updatedUser: User) {
    const users = this.users$.getValue();
    const indexOfUpdated = users.findIndex(user => user.id === updatedUser.id);
    users[indexOfUpdated] = updatedUser;
    this.users$.next([...users]);
  }

  updateUserId(userToReplace: User, addedUserWithId: User) {
    const users = this.users$.getValue();
    const updatedUserIndex = users.findIndex(user => user === userToReplace);
    users[updatedUserIndex] = addedUserWithId;
    this.users$.next([...users]);
  }

  removeUser(categoryRemove: User) {
    const currentValue = this.users$.getValue();
    this.users$.next(currentValue.filter(category => category !== categoryRemove));
  }
}
