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

  constructor(private dashboardApi: DashboardApi,
  ) {

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
