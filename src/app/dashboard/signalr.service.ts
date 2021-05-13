import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { OrderDto } from '@models/order';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private connection: HubConnection;
  // itemUpdated: Subject<OrderDto> = new Subject<OrderDto>();
  // itemAdded: Subject<OrderDto> = new Subject<OrderDto>();
  orderChanges: Subject<string> = new Subject<string>();
  tradeChanges: Subject<string> = new Subject<string>();

  constructor() {
    this.connection = new HubConnectionBuilder()
      .withUrl('http://164.160.104.123:9090/marketchanges')
      .build();
    this.registerOnEvents();
    this.connection.start().catch(err => console.log(err.toString()));
  }

  registerOnEvents() {
    this.connection.on('SendOrderChanges', item => {
      console.log('SendOrderChanges');
      this.orderChanges.next(item);
    });

    this.connection.on('SendTradeChanges', item => {
      console.log('SendTradeChanges');
      this.tradeChanges.next(item);
    });
  }
}