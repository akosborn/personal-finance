export class Wallet {
  private checkingBalance;
  private savingsBalance;
  private debtBalance;

  constructor(checkingBalance: number,
              savingsBalance: number,
              debtBalance: number) {
    this.checkingBalance = checkingBalance;
    this.savingsBalance = savingsBalance;
    this.debtBalance = debtBalance;
  }

  getCheckingBalance(): number {
    return this.checkingBalance;
  }

  setCheckingBalance(balance: number) {
    this.checkingBalance = balance;
  }

  getSavingsBalance() {
    return this.savingsBalance;
  }

  setSavingsBalance(balance: number) {
    this.savingsBalance = balance;
  }

  getDebtBalance() {
    return this.debtBalance;
  }

  setDebtBalance(balance: number) {
    this.debtBalance = balance;
  }
}
