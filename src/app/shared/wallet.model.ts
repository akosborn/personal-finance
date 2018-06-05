export class Wallet {
  private checkingBalance;
  private savingsBalance;
  private debtBalance;

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
