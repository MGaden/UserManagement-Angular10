import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './container/users.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { EditingDialogComponent } from './components/editing-dialog/editing-dialog.component';
import { UserResolver } from './resolvers/user.resolver';
import { UsersFacade } from './users.facade';
import { UsersState } from './users.state';
import { EditingGuard } from './guards/editing.guard';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    UsersComponent,
    UserFormComponent,
    UserListComponent,
    EditingDialogComponent,
  ],
  providers: [
    UserResolver,
    UsersFacade,
    UsersState,
    EditingGuard
  ],
  entryComponents: [EditingDialogComponent]
})
export class UsersModule { }
