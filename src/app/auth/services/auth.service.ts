import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { config} from '../../core/config';
import { CacheService } from '../../core/cache.service';
import { AuthStrategy, AUTH_STRATEGY } from './auth.strategy';
import { LoginRequest } from '@models/loginRequest';
import { User } from '@models/user';
//import { Role } from '@models/types';
import { SignUpRequest } from '@models/signUpRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isGranted(permission: string) {
    let ret: boolean = false;

    // See if an array of values was passed in.
    if (typeof permission === "string") {
        ret = this.isPermissionValid(permission);
    }
    else {
        let claims: string[] = permission;
        if (claims) {
            for (let index = 0;
            index < claims.length;
            index++) {
                ret = this.isPermissionValid(claims[index]);
                // If one is successful, then let them in
                if (ret) {
                    break;
                }
            }
        }
    }

    return ret;
  }

  isPermissionValid(permission: string): boolean {
    
    let claims = this.auth.getCurrentUserClaims();
    if (typeof claims === "string") {
      return String(claims).toLowerCase() == permission.toLowerCase();
  }
     if(claims != undefined && claims != null && claims.length > 0)
     {
      return claims.find(
        c => c.toLowerCase()
            == permission.toLowerCase())
            != null;
     }

     return false;
    
  }

  public readonly INITIAL_PATH = '/app/dashboard';
  public readonly ADMIN_PATH = '/admin';
  public readonly LOGIN_PATH = '/login';
  public readonly CONFIRM_PATH = '/confirm';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cacheService: CacheService,
    @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>
  ) { }

  // getInitialPathForRole(role: Role): string {
  //   return role === 'ADMIN' ? this.ADMIN_PATH : this.INITIAL_PATH;
  // }

  signup(user: SignUpRequest): Observable<void> {
    user.clientCallbackUrl = config.emailConfirmCallBackUrl;
    return this.http.post<any>(`${config.authUrl}/register`, user);
  }

  confirm(userId: string, code: string): Observable<void> {
    return this.http.post<any>(`${config.authUrl}/confirmEmail`, {userId : userId, code : code});
  }

  login(loginRequest: LoginRequest, rememberMe : boolean): Observable<User> {

    this.auth.setRememberMe(rememberMe);

    return this.http.post<any>(`${config.authUrl}/token`, loginRequest)
      .pipe(tap(data => this.auth.doLoginUser(data)));
  }

  logout() {
    return this.http.delete<any>(`${config.manageUrl}/logout`)
      .pipe(tap(() => this.doLogoutUser()),catchError(() => of(this.doLogoutUser())));
  }

  isLoggedIn$(): Observable<boolean> {
    return this.auth.getCurrentUser().pipe(
      map(user => !!user),
      catchError(() => of(false))
    );
  }

  getCurrentUser$(): Observable<User> {
    return this.auth.getCurrentUser();
  }

  getUserRole$(): Observable<string> {
    return this.auth.getCurrentUser().pipe(
      map(user => user.email)
    );
  }

  getUserEmail$(): Observable<string> {
    return this.auth.getCurrentUser().pipe(
      map(user => user.email)
    );
  }

  doLogoutAndRedirectToLogin() {
    this.doLogoutUser();
    this.router.navigate(['/login']);
  }

  private doLogoutUser() {
    this.cacheService.pruneAll();
    this.auth.doLogoutUser();
  }

  refreshToken() {
    return this.http.post<any>(`${config.authUrl}/refreshToken`, this.auth.getRefreshTokenRequest())
      .pipe(tap(data => this.auth.doLoginUser(data)));
}

// helper methods

// private refreshTokenTimeout;

// public startRefreshTokenTimer() {
//     // parse json object from base64 encoded jwt token
//     const jwtToken = JSON.parse(atob(this.auth.getToken().split('.')[1]));
//     // set a timeout to refresh the token a minute before it expires
//     const expires = new Date(jwtToken.exp * 1000);
//     const timeout = expires.getTime() - Date.now() - (60 * 1000);
//     this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
// }

// private stopRefreshTokenTimer() {
//     clearTimeout(this.refreshTokenTimeout);
// }

}
