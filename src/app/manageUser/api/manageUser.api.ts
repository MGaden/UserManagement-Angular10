import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { config } from '../../core/config';
import { Expense } from '@models/expense';
import { Period } from '@models/period';
import { User } from '@models/user';
import { ChangePasswordRequest } from '@models/changePasswordRequest';

@Injectable()
export class ManageUserApi {
  
  private readonly API_URL = `${config.apiUrl}/manage`;

  constructor(private http: HttpClient) {}

  getExpenses(period: Period): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.API_URL}/?month=${period.month}&year=${period.year}`);
  }

  filterExpenses(period: Period, category: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.API_URL}/?month=${period.month}&year=${period.year}&categoryName=${category}`);
  }

  createExpense(expense: Expense): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/`, expense);
  }

  updateExpense(expense: Expense): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${expense.id}`, expense);
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/userInfo`);
  }

  changePassword(request: ChangePasswordRequest): Observable<void> {
    return this.http.post<any>(`${this.API_URL}/changePassword`, request);
  }

  sendConfirmMail(id: string): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/sendVerificationEmail`,{ clientCallbackUrl :  config.emailConfirmCallBackUrl});
  }

}
