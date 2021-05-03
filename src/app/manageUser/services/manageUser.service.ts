import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PeriodService } from '../../shared/services/period.service';
import { ManageUserApi } from '../api/manageUser.api';
//import { Period } from '@models/period';
import { User } from '@models/user';
import { ChangePasswordRequest } from '@models/changePasswordRequest';

@Injectable()
export class ManageUserService {

  //private period = this.periodService.getCurrentPeriod();

  constructor(private manageUserApi: ManageUserApi, private periodService: PeriodService) { }

  getUserInfo(): Observable<User> {
    return this.manageUserApi.getUserInfo();
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {

    return this.manageUserApi.changePassword(request);
  }

  sendConfirmMail(id: string): Observable<void> {
    return this.manageUserApi.sendConfirmMail(id);
  }

}
