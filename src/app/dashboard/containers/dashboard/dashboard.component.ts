import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { DashboardService } from './../../dashboard.service';
import { PeriodService } from '../../../shared/services/period.service';
import { DashboardData } from '@models/dashboardData';
import { SignalRService } from 'app/dashboard/signalr.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  dashBoardSummary: DashboardData;
  dashBoardSub: Subscription;
  dashBoardLoaded = false;
  orderUpdates: string[]= [];
  tradeUpdates: string[]= [];
  orderUpdatesTitle: string = 'Order updates';
  tradeUpdatesTitle: string = 'Trade updates';

  constructor(private dashboard: DashboardService, private periodService: PeriodService,private readonly signalrService: SignalRService) {

    signalrService.orderChanges.subscribe(item => {
      //this.items = [item, ...this.items];
      console.log("orderChanges");
      let orders = JSON.parse(item);
      this.orderUpdates.push(orders[0].OrderID.toString());
    });
    signalrService.tradeChanges.subscribe(item => {
      // this.items = this.items.filter(x => x.id !== item.id);
      // this.items = [item, ...this.items];
      console.log("tradeChanges");
      let trades = JSON.parse(item);
      this.tradeUpdates.push(trades[0].TradeID.toString());
    });

  }

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
