import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class SecretApi {

  private readonly API_URL = `/secret`;

  constructor(private http: HttpClient) {}

  getSecret(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

}
