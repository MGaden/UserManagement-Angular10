import { DashboardApi } from './api/dashboard.api';
import { DashboardService } from './dashboard.service';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { SummaryComponent } from './components/summary/summary.component';
import { DashBoardProgressComponent } from './components/dashBoard-progress/dashBoard-progress.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { TranslocoRootModule } from 'app/transloco/transloco-root.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ResizableModule } from 'angular-resizable-element';
import { WidgetComponent } from './components/widget/widget.component';

@NgModule({
  imports: [
    SharedModule,GridModule,BrowserAnimationsModule,BrowserModule,TranslocoRootModule,DragDropModule,ResizableModule
  ],
  declarations: [
    DashboardComponent,
    SummaryComponent,
    DashBoardProgressComponent,
    WidgetComponent
  ],
  exports: [ DashboardComponent ],
  providers: [ DashboardService, DashboardApi ]
})
export class DashboardModule { }
