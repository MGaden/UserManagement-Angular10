
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'idlet-timeout-dialog',
  templateUrl: './idlet-timeout-dialog.component.html',
  styleUrls: ['./idlet-timeout-dialog.component.scss']
})
export class IdleTimeoutDialogComponent {

  constructor(private dialogRef: MatDialogRef<IdleTimeoutDialogComponent>) {
        
    setTimeout (() => {
      this.close(true);
   }, 10000);
   }

  close(result: boolean) {
    this.dialogRef.close(result);
  }

}

