import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecoveryPasswordRequest, ResetPasswordRequest } from '@models/resetPasswordRequest';
import { AppConsts } from 'app/core/config';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  resetPassword(request: ResetPasswordRequest): Observable<void> {
    // never send password over HTTP GET!
    return this.http.post<any>(`${AppConsts.authApiUrl}${AppConsts.authUrl}/resetPassword`, request);
  }

  requestRecovery(email: RecoveryPasswordRequest) : Observable<void> {
    email.clientCallbackUrl = AppConsts.frontEndUrl + '/password';
    return this.http.post<any>(`${AppConsts.authApiUrl}${AppConsts.authUrl}/forgotPassword`, email );
  }

}
