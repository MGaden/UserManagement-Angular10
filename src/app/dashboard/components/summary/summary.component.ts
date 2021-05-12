import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DashboardData } from '@models/dashboardData';
import { OrderDto } from '@models/order';
import { DashboardApi } from 'app/dashboard/api/dashboard.api';
import { SignalRService } from 'app/dashboard/signalr.service';
import { DataBindingDirective } from '@progress/kendo-angular-grid';
import { process } from '@progress/kendo-data-query';

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
    signalrService.itemAdded.subscribe(item => {
      //this.items = [item, ...this.items];
      console.log("itemAdded");
    });
    signalrService.itemUpdated.subscribe(item => {
      // this.items = this.items.filter(x => x.id !== item.id);
      // this.items = [item, ...this.items];
      console.log("itemUpdated");
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
