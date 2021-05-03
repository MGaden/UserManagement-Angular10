import { Injectable, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

import { config } from '../core/config';
import { AuthService } from './services/auth.service';
import { JwtAuthStrategy } from './services/jwt-auth.strategy';
import { AUTH_STRATEGY } from './services/auth.strategy';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, @Inject(AUTH_STRATEGY) private jwt: JwtAuthStrategy) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (config.auth === 'token' && this.jwt && this.jwt.getToken()) {
      request = this.addToken(request, this.jwt.getToken());
    }

    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if(!request.url.includes("/logout") && !request.url.includes("/refreshToken"))
      {
        if (error.status === 401) {        
          return this.handle401Error(request, next);
        }
      }else
      {
        this.authService.doLogoutAndRedirectToLogin();
      }
      return throwError(error);
    }));

  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });
  }

  private isRefreshing = false;
private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  if (!this.isRefreshing) {
    this.isRefreshing = true;
    this.refreshTokenSubject.next(null);

    return this.authService.refreshToken().pipe(
      switchMap((res: any) => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next(res.token);
        return next.handle(this.addToken(request, res.token));
      }));

  } else {
    return this.refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(jwt => {
        return next.handle(this.addToken(request, jwt));
      }));
  }
}

}
