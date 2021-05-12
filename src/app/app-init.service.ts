import { HttpClient } from '@angular/common/http';
import { Injectable }  from '@angular/core';
import { Observable } from 'rxjs';
import { AppConsts } from './core/config';
 
@Injectable()
export class AppInitService {
 
    constructor(private http: HttpClient) {
    }
    
    Init() {
        return new Promise<void>((resolve, reject) => {

            this.getJSON().subscribe(data => {
                AppConsts.authApiUrl = data["authApiUrl"];
                AppConsts.bussinessApiUrl = data["bussinessApiUrl"];
                AppConsts.frontEndUrl = data["frontEndUrl"];
                AppConsts.idelTimeout = Number(data["idelTimeout"]);
                AppConsts.idelPeriod = Number(data["idlePeriod"]);
                resolve();
               });
        });
    }

    public getJSON(): Observable<any> {
        return this.http.get('assets/ConfigJson.json');
      }

}