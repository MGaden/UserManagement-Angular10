import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';

import { RolesComponent } from '../container/roles.component';
import { EditingDialogComponent } from '../components/editing-dialog/editing-dialog.component';

@Injectable()
export class EditingGuard implements CanDeactivate<RolesComponent> {

  constructor(private dialog: MatDialog) {}

  canDeactivate(RolesComponent: RolesComponent): Observable<boolean> {
    if (RolesComponent.isAnyFormDirty()) {
      const editingDialog = this.dialog.open(EditingDialogComponent);
      return editingDialog.afterClosed();
    }
    return of(true);
  }

}
