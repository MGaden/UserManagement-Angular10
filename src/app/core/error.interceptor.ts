import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../shared/components/snackbar/snackbar.component';
import { AppConsts } from './config';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.showErrorMessage(error);
        // if (!this.isErrorMessageSuppressed(error)) {
          
        // }
        return throwError(error);
      }));
  }

  private isErrorMessageSuppressed (error: HttpErrorResponse) {
    return this.isQueryForLoggedUser(error) 
     || this.isOtpRequired(error);
  }

  // when Node backend is not running, then logged user query fails; let's not show the error
  private isQueryForLoggedUser(error: HttpErrorResponse) {
    return error.url.endsWith(`${AppConsts.authApiUrl}${AppConsts.userUrl}`);
  }

  private isOtpRequired(error: HttpErrorResponse) {
    return error.error.msg === 'OTP_REQUIRED';
  }

  private showErrorMessage(error: HttpErrorResponse) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: error?.error?.msg ?? 'Unknown error'
    });
  }

}
