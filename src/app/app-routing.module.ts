import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {CheckingAccountsComponent} from './checking-accounts/checking-accounts.component';
import {SavingsAccountsComponent} from './savings-accounts/savings-accounts.component';
import {CreditCardsComponent} from './credit-cards/credit-cards.component';
import {LoansComponent} from './loans/loans.component';
import {InvestmentsComponent} from './investments/investments.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'checking', component: CheckingAccountsComponent },
  { path: 'savings', component: SavingsAccountsComponent },
  { path: 'credit-cards', component: CreditCardsComponent },
  { path: 'loans', component: LoansComponent },
  { path: 'investments', component: InvestmentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
