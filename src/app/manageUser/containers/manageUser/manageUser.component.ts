import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, of } from 'rxjs';
import { map,tap, switchMap, catchError, filter } from 'rxjs/operators';

import { ChangePasswordDialogComponent, ChangePasswordCallback, ChangePasswordDialogData } from '../../components/changePassword-dialog/changePassword-dialog-component';
import { ManageUserService } from '../../services/manageUser.service';
import { AuthService } from '../../../auth/services/auth.service';
import { PeriodService } from '../../../shared/services/period.service';
import { SnackBarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { User } from '@models/user';
import { ChangePasswordRequest } from '@models/changePasswordRequest';

@Component({
  selector: 'manageUser',
  templateUrl: './manageUser.component.html',
  styleUrls: ['./manageUser.component.scss']
})
export class ManageUserComponent implements OnInit, AfterViewInit, OnDestroy {

  user: User;
  isLoading = true;
  period = this.periodService.getCurrentPeriod();

  constructor(
    private authService: AuthService,
    private periodService: PeriodService,
    private manageUserService: ManageUserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadUserInfo$().subscribe();
    this.authService.getUserRole$()
      .pipe(filter(role => role === 'OWNER'))
      .subscribe(() => this.adaptToOwnersRole());
  }

  adaptToOwnersRole() {
    
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
  }

  openChangePasswordDialog() {
    this.dialog.open<ChangePasswordDialogComponent, ChangePasswordDialogData>(ChangePasswordDialogComponent, {
      data: {
        callback$: this.getChangePasswordCallback$()
      },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    });
  }

  loadUserInfo$() {
    this.isLoading = true;
    return this.manageUserService.getUserInfo()
      .pipe(
        map((data) => {
          this.isLoading = false;
          this.user = data;
        }));
  }

  getLoadUserCallback$() {
    return (() => this.loadUserInfo$());
  }

  getChangePasswordCallback$(): ChangePasswordCallback {
    return (changePasswordObj: ChangePasswordRequest) => this.manageUserService.changePassword(changePasswordObj)
      .pipe(
        switchMap(() => this.loadUserInfo$()),
        tap(() => this.showResultSnackbar('Success')),
        catchError((errorResponse) => {
          this.showResultSnackbar(errorResponse.error?.msg ?? 'Unknown error');
          return of(errorResponse);
        })
      );
  }

  private showResultSnackbar(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      data: message
    });
  }

}
