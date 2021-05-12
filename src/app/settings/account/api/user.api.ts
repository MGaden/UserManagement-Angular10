import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@models/user';
import { AppConsts } from 'app/core/config';

@Injectable()
export class UserApi {

  private readonly API_URL = `${AppConsts.authApiUrl}${AppConsts.userUrl}`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }

  createUser(user: User): Observable<void> {
    return this.http.post<void>(this.API_URL, user);
  }

  patchUser(id: string, data: any): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}`, data);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

}
