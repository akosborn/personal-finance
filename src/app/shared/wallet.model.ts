export class Wallet {
  checkingBalance: number;
  savingsBalance: number;
  debtBalance: number;

  constructor(checkingBalance: number,
              savingsBalance: number,
              debtBalance: number) {
    this.checkingBalance = checkingBalance;
    this.savingsBalance = savingsBalance;
    this.debtBalance = debtBalance;
  }
}
