import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DashboardData } from '@models/dashboardData';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnInit {

  @Input()
  dashboardData: DashboardData;

  ngOnInit() {}

}
