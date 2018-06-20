import { CheckingAccount } from './CheckingAccount';
import { SavingsAccount } from './SavingsAccount';
import { Loan } from './Loan';
import { CreditCard } from './CreditCard';
import { Investment } from './Investment';

export class Wallet {
  id: number;
  name: string;
  description: string;
  checkingAccounts: CheckingAccount[] = [];
  savingsAccounts: SavingsAccount[] = [];
  loans: Loan[] = [];
  creditCards: CreditCard[] = [];
  investments: Investment[] = [];


  constructor(id: number, name: string, description: string, checkingAccounts: CheckingAccount[],
              savingsAccounts: SavingsAccount[], loans: Loan[], creditCards: CreditCard[],
              investments: Investment[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.checkingAccounts = checkingAccounts;
    this.savingsAccounts = savingsAccounts;
    this.loans = loans;
    this.creditCards = creditCards;
    this.investments = investments;
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
