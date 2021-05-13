
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardApi } from 'app/dashboard/api/dashboard.api';

@Component({
  selector: 'orderTicket-dialog',
  templateUrl: './orderTicket-dialog.component.html',
  styleUrls: ['./orderTicket-dialog.component.scss']
})
export class OrderTicketDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<OrderTicketDialogComponent>,private dashboardApi: DashboardApi) {

    
   }

  ngOnInit(): void {
    document.getElementById("json-textArea").innerHTML = JSON.stringify(this.jsonOrder, undefined, 2);

  }

  jsonOrder : any = {
    "MsgType": "1",
    "OrderType": 1,
    "SymbolCode": "Symb1",
    "MarketID": 1,
    "OrderQty": 10,
    "OrderPrice": 10,
    "OrderValidity": 1,
    "GoodTillDate": "2021-05-07T11:27:43.592Z",
    "MinimumFill": 0,
    "CustodianID": 0,
    "ClientID": 1,
    "AuctionID": 0
  };

  close() {
    this.dialogRef.close(false);
  }

  save() {
    let newOrder = JSON.parse((<HTMLInputElement>document.getElementById("json-textArea")).value);

    this.dashboardApi.createOrder(newOrder).subscribe(() => {
      this.dialogRef.close(true);
    });
    
  }

}

