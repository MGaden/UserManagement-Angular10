import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Period } from '@models/period';
import { config } from '../../core/config';
import { DashboardData } from '@models/dashboardData';
import { User } from '@models/user';

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

}
