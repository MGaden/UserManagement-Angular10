import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '@models/user';
import { Observable } from 'rxjs';

import { UsersFacade } from '../users.facade';

@Injectable()
export class UserResolver implements Resolve<User[]> {

  constructor(private settingsFacade: UsersFacade) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this.settingsFacade.loadUsers();
  }

}
