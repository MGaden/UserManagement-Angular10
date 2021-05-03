import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ManageUserRoutingModule } from './manageUser-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManageUserApi } from './api/manageUser.api';
import { ManageUserService } from './services/manageUser.service';
import { ManageUserComponent } from './containers/manageUser/manageUser.component';
import { UserInfoComponent } from './components/userInfo/userInfo.component';
import { ConfirmSendMailComponent } from './components/confirm-sendMail/confirm-sendMail.component';
import { ChangePasswordDialogComponent } from './components/changePassword-dialog/changePassword-dialog-component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ManageUserRoutingModule,
  ],
  declarations: [
    ManageUserComponent,
    UserInfoComponent,
    ConfirmSendMailComponent,
    ChangePasswordDialogComponent
  ],
  entryComponents: [ChangePasswordDialogComponent, ConfirmSendMailComponent],
  providers: [ManageUserService, ManageUserApi]
})
export class ManageUserModule { }
