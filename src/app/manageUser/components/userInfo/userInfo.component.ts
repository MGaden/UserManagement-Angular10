import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmSendMailComponent, ConfirmSendMailCallback, ConfirmSendMailData } from '../confirm-sendMail/confirm-sendMail.component';
import { ChangePasswordDialogComponent, ChangePasswordCallback, ChangePasswordDialogData } from '../changePassword-dialog/changePassword-dialog-component';
import { User } from '@models/user';

@Component({
  selector: 'userInfo',
  templateUrl: './userInfo.component.html',
  styleUrls: ['./userInfo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent {

  @Input()
  user: User;

  @Input()
  confirmSendMailCallback: ConfirmSendMailCallback;

  @Input()
  changePasswordCallback: ChangePasswordCallback;

  constructor(private bottomSheet: MatBottomSheet, private dialog: MatDialog) { }

  changePassword() {
    this.dialog.open<ChangePasswordDialogComponent, ChangePasswordDialogData>(ChangePasswordDialogComponent, {
      data: {
        callback$: this.changePasswordCallback
      },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%'
    });
  }

  confirmSendMail(userId: string) {
    this.bottomSheet.open<ConfirmSendMailComponent, ConfirmSendMailData>(ConfirmSendMailComponent, {
      data: {
        userId: userId,
        callback$: this.confirmSendMailCallback
      }
    });
  }
}
