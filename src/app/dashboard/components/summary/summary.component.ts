import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DashboardData } from '@models/dashboardData';
import { OrderDto } from '@models/order';
import { DashboardApi } from 'app/dashboard/api/dashboard.api';
import { SignalRService } from 'app/dashboard/signalr.service';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnInit {

  items: OrderDto[];
  form: FormGroup;

  @Input()
  dashboardData: DashboardData;

  constructor(
    private readonly signalrService: SignalRService,private dashboardApi: DashboardApi,
  ) {
    signalrService.orderChanges.subscribe(item => {
      //this.items = [item, ...this.items];
      let orders = JSON.parse(item);
       this.items = this.items.filter(x => x.OrderID !== orders[0].OrderID);
      this.items = [orders[0], ...this.items];
    });
  }
  
  getOrders()
  {
    this.dashboardApi.getOrders()
    .subscribe(items => {
      this.items = items;
    });

  }

  viewOrder(order)
  {
    
  }

  ngOnInit() {this.getOrders();}

}
