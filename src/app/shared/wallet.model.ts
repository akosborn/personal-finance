import { CheckingAccount } from './checking-account.model';
import { SavingsAccount } from './SavingsAccount';
import { Loan } from './Loan';
import { Investment } from './investment.model';
import { CreditCard } from './credit-card.model';

export class Wallet {
  id: number;
  userId: number;
  name: string;
  description: string;
  checkingAccounts: CheckingAccount[] = [];
  savingsAccounts: SavingsAccount[] = [];
  loans: Loan[] = [];
  creditCards: CreditCard[] = [];
  investments: Investment[] = [];
  weeklyIncome: number;
  annualIncome: number;

  constructor(id: number, userId: number, name: string, description: string, weeklyIncome: number, checkingAccounts: CheckingAccount[],
              savingsAccounts: SavingsAccount[], loans: Loan[], creditCards: CreditCard[], investments: Investment[],
              annualIncome: number) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.weeklyIncome = weeklyIncome;
    this.checkingAccounts = checkingAccounts;
    this.savingsAccounts = savingsAccounts;
    this.loans = loans;
    this.creditCards = creditCards;
    this.investments = investments;
    this.annualIncome = annualIncome;
  }

  private static calculateBalance(accounts: CheckingAccount[] | SavingsAccount[] | Loan[] | CreditCard[] | Investment[]): number {
    let balance = 0;
    for (const acct of accounts) {
      balance += acct.balance;
    }
    return balance;
  }

  getCheckingBalance(): number {
    return Wallet.calculateBalance(this.checkingAccounts);
  }

  getSavingsBalance(): number {
    return Wallet.calculateBalance(this.savingsAccounts);
  }

  getCreditCardBalance(): number {
    return Wallet.calculateBalance(this.creditCards);
  }

  getLoansBalance(): number {
    return Wallet.calculateBalance(this.loans);
  }

  getInvestmentsBalance(): number {
    return Wallet.calculateBalance(this.investments);
  }
}
