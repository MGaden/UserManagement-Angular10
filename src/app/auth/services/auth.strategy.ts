import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from './../../core/config';
import { SessionAuthStrategy } from './session-auth.strategy';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { User } from '@models/user';

export interface AuthStrategy<T> {
  setRememberMe(rememberMe: boolean);

  doLoginUser(data: T): void;

  doLogoutUser(): void;

  getCurrentUser(): Observable<User>;

  getRefreshTokenRequest() : any;

  getToken() : string;

  getCurrentUserClaims() : string[];

}

export const AUTH_STRATEGY = new InjectionToken<AuthStrategy<any>>('AuthStrategy');

export const authStrategyProvider = {
  provide: AUTH_STRATEGY,
  deps: [HttpClient],
  useFactory: (http: HttpClient) => {
    switch (config.auth) {
        case 'session':
          return new SessionAuthStrategy(http);
        case 'token':
          return new JwtAuthStrategy();
      }
  }
};
