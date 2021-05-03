import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ManageUserService } from '../../services/manageUser.service';

export interface ConfirmSendMailData {
  userId: string;
  callback$: ConfirmSendMailCallback;
}

export type ConfirmSendMailCallback = () => Observable<void>;

@Component({
  selector: 'confirm-sendMail',
  templateUrl: 'confirm-sendMail.template.html',
})
export class ConfirmSendMailComponent implements OnInit {

  inProgress: boolean;
  confirmText: string;

  constructor(private bottomSheetRef: MatBottomSheetRef<ConfirmSendMailComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: ConfirmSendMailData,
    private manageUserSevice: ManageUserService) {}

  ngOnInit() {
    this.inProgress = false;
    this.confirmText = 'Confirm';
  }

  confirm(): void {
    this.inProgress = true;
    this.confirmText = 'Please wait...';
    this.manageUserSevice.sendConfirmMail(this.data.userId)
      .pipe(switchMap(() => this.data.callback$()))
      .subscribe(() => this.bottomSheetRef.dismiss());
  }

  cancel() {
    this.bottomSheetRef.dismiss();
  }

}
