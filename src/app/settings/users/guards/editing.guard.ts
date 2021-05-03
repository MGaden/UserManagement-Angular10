import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { UsersComponent } from '../container/users.component';
import { EditingDialogComponent } from '../components/editing-dialog/editing-dialog.component';

@Injectable()
export class EditingGuard implements CanDeactivate<UsersComponent> {

  constructor(private dialog: MatDialog) {}

  canDeactivate(usersComponent: UsersComponent): Observable<boolean> {
    if (usersComponent.isAnyFormDirty()) {
      const editingDialog = this.dialog.open(EditingDialogComponent);
      return editingDialog.afterClosed();
    }
    return of(true);
  }

}
