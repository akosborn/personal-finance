import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideNavToggleService } from './shared/side-nav-toggle.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullWidthDirective } from './shared/full-width.directive';
import { WalletService } from './shared/wallet.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TransactionsComponent } from './transactions/transactions.component';
import { ExpenseService } from './shared/expense.service';
import { SumPipe } from './shared/sum.pipe';
import { CheckingAccountsComponent } from './checking-accounts/checking-accounts.component';
import { SavingsAccountsComponent } from './savings-accounts/savings-accounts.component';
import { CreditCardsComponent } from './credit-cards/credit-cards.component';
import { InvestmentsComponent } from './investments/investments.component';
import { LoansComponent } from './loans/loans.component';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('4146647642-k52cqa8q4csm2d866nl51ic4kc6hu5ve.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SideNavComponent,
    DashboardComponent,
    FullWidthDirective,
    TransactionsComponent,
    SumPipe,
    CheckingAccountsComponent,
    SavingsAccountsComponent,
    CreditCardsComponent,
    InvestmentsComponent,
    LoansComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    ReactiveFormsModule
  ],
  providers: [
    SideNavToggleService,
    ExpenseService,
    WalletService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
