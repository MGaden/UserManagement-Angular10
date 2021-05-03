import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CacheService, Prunable } from '../core/cache.service';
import { DashboardApi } from './api/dashboard.api';
import { Period } from '@models/period';
import { DashboardData } from '@models/dashboardData';

@Injectable()
export class DashboardService implements Prunable {

  private dashBoardData: Observable<DashboardData>;

  constructor(private dashboardApi: DashboardApi, private cacheService: CacheService) {
    this.cacheService.registerPrunable(this);
  }

  getDashBoardData(period: Period): Observable<DashboardData> {
    if (!this.dashBoardData) {
      this.dashBoardData = this.dashboardApi
        .getDashboardData(period)
        .pipe(shareReplay(1));
    }
    return this.dashBoardData;
  }

  pruneCache() {
    this.dashBoardData = null;
  }
}
