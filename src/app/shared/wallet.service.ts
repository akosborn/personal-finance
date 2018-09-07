import {Injectable, OnInit} from '@angular/core';
import { Wallet } from './wallet.model';
import {Observable, Subject, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AppComponent} from '../app.component';
import { AuthService } from 'angularx-social-login';

@Injectable()
export class WalletService implements OnInit {
  wallet: Wallet;
  walletSubject: Subject<Wallet> = new Subject<Wallet>();
  walletSubscription: Subscription;

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.walletSubscription = this.walletSubject
      .subscribe(
        (wallet: Wallet) => this.wallet = wallet
      );
  }

  getWallet(): Observable<Wallet> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ5NjQ4ZTAzMmNhYzU4NDI0ZTBkMWE3YzAzMGEzMTk4ZDNmNDZhZGIifQ.eyJhenAiOiI0MTQ2NjQ3NjQyL' +
        'Ws1MmNxYThxNGNzbTJkODY2bmw1MWljNGtjNmh1NXZlLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiNDE0NjY0NzY0Mi1rNTJjcWE4cTRjc20yZDg2Nm' +
        '5sNTFpYzRrYzZodTV2ZS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMDUxOTUwMjM5OTk0NzE4ODAxNyIsImVtYWlsIjoiYW5kcmV3b3Nib3JuOTNA' +
        'Z21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiIxUGpoazVBNVJSQXp5emFHMUJtMV9nIiwiZXhwIjoxNTM2MjkyNDQyLCJpc3MiOiJhY2NvdW' +
        '50cy5nb29nbGUuY29tIiwianRpIjoiNzU1MDJlOTUzODc1NDg4MDQ2ZGQ4ZDg0ZDA0MzJhMWY1NjkzMjQ3NSIsImlhdCI6MTUzNjI4ODg0MiwibmFtZSI6IkFuZHJldyB' +
        'Pc2Jvcm4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDYuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy13cFFHSUNFVUtlQS9BQUFBQUFBQUFBSS9BQUFBQUFBQUc1RS9wNkxxNldB' +
        'dE5xSS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQW5kcmV3IiwiZmFtaWx5X25hbWUiOiJPc2Jvcm4iLCJsb2NhbGUiOiJlbiJ9.u_JmXvL3FJIXAgtHYksnD' +
        'htC8iMjoAcVpZzqBg3xDpNE_XKJlHmsX7p8oIZKNK74jStLqQkH0aOSpwTpcfS9zUO80BoBYDZVUKZJoBWO0_EXl-8wubC_9aN6SGnVkxpEbb3Sp6aHe1qDmaezLWazdu' +
        'vLUkV7xlNLLN3n_HLb6Z74Auu2HjbW-snxCJ8BXKokkx3Pr91QWDQq1khhFGwISekPAbxAWfrAWvxv5wpB_mSntItS2rW1fhUe6roZ_KOicX6YU-xvUCnqPdzb7MfTOomy' +
        'eWq0FLidK5HHs_NVZG_Gp9gorbsrWfp7JHPWfBMn5mbvmn6EmStiZOfZ_FpSaw'
      })
    };
    // const headers = new HttpHeaders({'Authorizaton': })
    return this.http.get<Wallet>(AppComponent.apiBaseUrl + 'wallet', httpOptions)
      .pipe(map(
        (data: Wallet) =>
          this.wallet = new Wallet(
            data.id, data.name, data.description, data.checkingAccounts, data.savingsAccounts,
            data.loans, data.creditCards, data.investments)
      ));
  }

  login() {
    const headers = new HttpHeaders({'x-auth-token': this.getCookie('AUTH-TOKEN')});
    console.log(headers);
    return this.http.get('http://localhost:8080/api/user/current', {headers: headers})
      .subscribe(
        (data: any) => console.log(data),
        (error: Error) => console.log(error)
      );
  }

  getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }
}
