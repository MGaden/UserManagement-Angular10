import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConsts } from 'app/core/config';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  getActiveSessions(): Observable<[]> {
    return this.http.get<[]>(`${AppConsts.authApiUrl}${AppConsts.userUrl}/getAllRefreshTokens`);
  }

  destroySession(userId: string): Observable<[]> {
    return this.http.delete<[]>(`${AppConsts.authApiUrl}${AppConsts.userUrl}/revokeToken/${userId}`);
  }

}
