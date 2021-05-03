import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { ChangePasswordRequest } from '@models/changePasswordRequest';

export interface ChangePasswordDialogData {
  callback$: ChangePasswordCallback;
}

export type ChangePasswordCallback = (changePasswordObj: ChangePasswordRequest) => Observable<void>;

@Component({
  selector: 'changePassword-dialog',
  templateUrl: 'changePassword-dialog.component.html',
  styleUrls: ['changePassword-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordDialogComponent implements OnInit {

  changePasswordForm: FormGroup;
  submitText: string;
  inProgress: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChangePasswordDialogData) {
  }

  ngOnInit() {
    this.inProgress = false;
    this.submitText = 'Save';

    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  submit() {
    this.inProgress = true;
    this.submitText = 'Please wait...';
    const changePasswordObj = Object.assign(new ChangePasswordRequest(), this.changePasswordForm.value);
    this.data.callback$(changePasswordObj).subscribe(() => this.dialogRef.close());
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
