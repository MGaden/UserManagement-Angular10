import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { DashboardService } from './../../dashboard.service';
import { PeriodService } from '../../../shared/services/period.service';
import { DashboardData } from '@models/dashboardData';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  dashBoardSummary: DashboardData;
  dashBoardSub: Subscription;
  dashBoardLoaded = false;

  constructor(private dashboard: DashboardService, private periodService: PeriodService) {}

  ngOnInit() {
    const period = this.periodService.getCurrentPeriod();
    this.dashBoardSub = this.dashboard.getDashBoardData(period).subscribe(data => {
      this.dashBoardSummary = data;
      this.dashBoardLoaded = true;
    });
  }

  ngOnDestroy() {
    this.dashBoardSub.unsubscribe();
  }

}
