import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesComponent } from './container/roles.component';
import { EditingGuard } from './guards/editing.guard';
import { RoleResolver } from './resolvers/roles.resolver';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    canDeactivate: [EditingGuard],
    resolve: {
      Role: RoleResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
