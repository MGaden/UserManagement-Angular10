import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { CacheService } from '../../core/cache.service';
import { AuthStrategy, AUTH_STRATEGY } from './auth.strategy';
import { LoginRequest } from '@models/loginRequest';
import { User } from '@models/user';
//import { Role } from '@models/types';
import { SignUpRequest } from '@models/signUpRequest';
import { AppConsts } from 'app/core/config';

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

  signup(user: SignUpRequest): Observable<void> {
    user.clientCallbackUrl = AppConsts.frontEndUrl + '/confirm';
    return this.http.post<any>(`${AppConsts.authApiUrl}${AppConsts.authUrl}/register`, user);
  }

  confirm(userId: string, code: string): Observable<void> {
    return this.http.post<any>(`${AppConsts.authApiUrl}${AppConsts.authUrl}/confirmEmail`, {userId : userId, code : code});
  }

  login(loginRequest: LoginRequest, rememberMe : boolean): Observable<User> {

    this.auth.setRememberMe(rememberMe);

    return this.http.post<any>(`${AppConsts.authApiUrl}${AppConsts.authUrl}/token`, loginRequest)
      .pipe(tap(data => this.auth.doLoginUser(data)));
  }

  logout() {
    return this.http.delete<any>(`${AppConsts.authApiUrl}${AppConsts.manageUrl}/logout`)
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
    return this.http.post<any>(`${AppConsts.authApiUrl}${AppConsts.authUrl}/refreshToken`, this.auth.getRefreshTokenRequest())
      .pipe(tap(data => this.auth.doLoginUser(data)));
}

getRememberMe() : boolean
{
  return this.auth.getRememberMe();
}

}
