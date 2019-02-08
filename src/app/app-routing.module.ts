import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {CheckingAccountsComponent} from './checking-accounts/checking-accounts.component';
import {SavingsAccountsComponent} from './savings-accounts/savings-accounts.component';
import {CreditCardsComponent} from './credit-cards/credit-cards.component';
import {LoansComponent} from './loans/loans.component';
import {InvestmentsComponent} from './investments/investments.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth-guard.service';
import { BudgetComponent } from './budget/budget.component';
import { RepaymentComponent } from './repayment/repayment.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
  { path: 'checking', component: CheckingAccountsComponent, canActivate: [AuthGuard] },
  { path: 'savings', component: SavingsAccountsComponent, canActivate: [AuthGuard] },
  { path: 'credit-cards', component: CreditCardsComponent, canActivate: [AuthGuard] },
  { path: 'loans', component: LoansComponent, canActivate: [AuthGuard] },
  { path: 'investments', component: InvestmentsComponent, canActivate: [AuthGuard] },
  { path: 'budget', component: BudgetComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: RepaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
