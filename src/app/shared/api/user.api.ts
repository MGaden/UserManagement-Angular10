import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { AppConsts } from 'app/core/config';
import { Observable } from 'rxjs';

@Injectable()
export class UserApi {

  private API_URL = `${AppConsts.authApiUrl}${AppConsts.userUrl}`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/get`);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(this.API_URL, user);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.API_URL}/${user.id}`, user);
  }

}
