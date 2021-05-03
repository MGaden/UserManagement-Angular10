import { DashboardApi } from './api/dashboard.api';
import { DashboardService } from './dashboard.service';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { SummaryComponent } from './components/summary/summary.component';
import { DashBoardProgressComponent } from './components/dashBoard-progress/dashBoard-progress.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    SummaryComponent,
    DashBoardProgressComponent
  ],
  exports: [ DashboardComponent ],
  providers: [ DashboardService, DashboardApi ]
})
export class DashboardModule { }
