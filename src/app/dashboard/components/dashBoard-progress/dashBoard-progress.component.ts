import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DashboardData } from '@models/dashboardData';


@Component({
  selector: 'dashBoard-progress',
  templateUrl: './dashBoard-progress.component.html',
  styleUrls: ['./dashBoard-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashBoardProgressComponent implements OnInit {

  @Input()
  dashBoardData: DashboardData;
  today: string;

  constructor() { }

  ngOnInit() {
    this.today = '60%';
  }

}
