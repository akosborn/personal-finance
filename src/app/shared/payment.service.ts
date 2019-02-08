import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService, SocialUser } from 'angularx-social-login';
import { AppComponent } from '../app.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  httpOptions: { headers: HttpHeaders };
  authSub: Subscription;
  planSubject: Subject<any> = new Subject<any>();
  private plan: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authSub = this.authService.authState.subscribe(
      (user: SocialUser) => {
        if (user) {
          console.log('wowseer');
          this.httpOptions = {
            headers: new HttpHeaders({
              'Authorization': user.tokenId
            })
          };
          this.loadPlan().subscribe(
            (plan: any) => {
              this.planSubject.next(plan);
            }
          );
        }
      }
    );

    this.planSubject.subscribe((plan: any) => { this.plan = plan; });
  }

  loadPlan(): Observable<any> {
    return this.http.get<any>(AppComponent.apiBaseUrl + 'debt-repayment', this.httpOptions)
      .pipe(map(
        (response) => {
          return response;
        })
      );
  }

  getPlan() {
    return this.plan;
  }
}
