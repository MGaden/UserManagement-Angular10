import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { config } from '../../core/config';
import { RecoveryPasswordRequest, ResetPasswordRequest } from '@models/resetPasswordRequest';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  resetPassword(request: ResetPasswordRequest): Observable<void> {
    // never send password over HTTP GET!
    return this.http.post<any>(`${config.authUrl}/resetPassword`, request);
  }

  requestRecovery(email: RecoveryPasswordRequest) : Observable<void> {
    email.clientCallbackUrl = config.forgetPasswordCallBackUrl;
    return this.http.post<any>(`${config.authUrl}/forgotPassword`, email );
  }

}
