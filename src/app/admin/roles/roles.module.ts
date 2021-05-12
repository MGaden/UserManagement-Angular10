import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './container/roles.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { EditingDialogComponent } from './components/editing-dialog/editing-dialog.component';
import { RoleResolver } from './resolvers/roles.resolver';
import { RolesFacade } from './roles.facade';
import { RolesState } from './roles.state';
import { EditingGuard } from './guards/editing.guard';

@NgModule({
  imports: [
    SharedModule,
    RolesRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    RolesComponent,
    RoleFormComponent,
    RoleListComponent,
    EditingDialogComponent,
  ],
  providers: [
    RoleResolver,
    RolesFacade,
    RolesState,
    EditingGuard
  ],
  entryComponents: [EditingDialogComponent]
})
export class RolesModule { }
