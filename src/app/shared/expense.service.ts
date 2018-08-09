import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Expense} from './expense.model';
import {AppComponent} from '../app.component';
import { map } from 'rxjs/operators';

@Injectable()
export class ExpenseService {

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(AppComponent.apiBaseUrl + 'expenses');
  }

  sendHeader(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'json/application',
      'Token': token,
    });

    return this.http.post(AppComponent.apiBaseUrl + 'expenses/token', token, {headers: headers, responseType: 'text'}).pipe(
      map(
        (response: string) => {
          console.log(response);
          return response;
        }
      )
    );
  }
}
