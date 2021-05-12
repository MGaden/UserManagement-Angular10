import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Period } from '@models/period';
import { DashboardData } from '@models/dashboardData';
import { User } from '@models/user';
import { OrderDto } from '@models/order';
import { AppConsts } from 'app/core/config';

@Injectable()
export class DashboardApi {

  constructor(private http: HttpClient) {}

  getDashboardData(period: Period): Observable<DashboardData> {
    // return this.http.get(`${config.manageUrl}/userInfo`)
    //   .pipe(map((data: User) => new DashboardData()));

    return Observable.create( observer => {
      observer.next( new DashboardData() )
      observer.complete()
    });

  }

  getOrders(): Observable<[]> {
    return this.http.get<[]>(`${AppConsts.bussinessApiUrl}${AppConsts.orderUrl}/get`);
  }


}
