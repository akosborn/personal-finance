export class Wallet {
  id: number;
  name: string;
  description: string;
  checkingAccounts: Set<any>;
  savingsAccounts: Set<any>;
  loans: Set<any>;
  creditCards: Set<any>;
  investments: any;
}
