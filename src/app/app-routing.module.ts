import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './core/layout/layout.component';
import { DashboardComponent } from './dashboard/containers/dashboard/dashboard.component';
import { AppGuard } from './auth/guards/app.guard';
import { AdminGuard } from './admin/guards/admin.guard';
import { permissions } from './core/permission';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'app',
    canActivate: [AppGuard],
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manageuser', loadChildren: () => import('./manageUser/manageUser.module').then(m => m.ManageUserModule) },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) }
    ]
  },
  {
    path: 'admin',
    data: { permission: permissions.ManageUsers },
    canActivate: [AdminGuard],  // 🧐
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
