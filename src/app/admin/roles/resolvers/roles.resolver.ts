import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '@models/user';
import { Observable } from 'rxjs';

import { RolesFacade } from '../roles.facade';

@Injectable()
export class RoleResolver implements Resolve<User[]> {

  constructor(private settingsFacade: RolesFacade) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this.settingsFacade.loadUsers();
  }

}
