import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Expense} from './expense.model';
import {AppComponent} from '../app.component';

@Injectable()
export class ExpenseService {

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(AppComponent.apiBaseUrl + 'expenses');
  }
}
