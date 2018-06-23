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

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SideNavComponent,
    DashboardComponent,
    FullWidthDirective,
    TransactionsComponent,
    SumPipe,
    CheckingAccountsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    SideNavToggleService,
    ExpenseService,
    WalletService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
