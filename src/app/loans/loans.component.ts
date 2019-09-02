import { Component, OnInit } from '@angular/core';
import {WalletService} from '../shared/wallet.service';
import {Loan} from '../shared/Loan';
import {Subscription} from 'rxjs';
import {Wallet} from '../shared/wallet.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../loan.service';
import { CreditCard } from '../shared/credit-card.model';
import { AccountService } from '../shared/account.service';
import { AccountModel } from '../shared/account.model';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  wallet: Wallet;
  loans: Loan[];
  walletSubscription: Subscription;
  accountFormGroup: FormGroup;

  constructor(private walletService: WalletService,
              private acctService: AccountService) { }

  ngOnInit() {
    if (this.walletService.getWallet()) {
      this.wallet = this.walletService.getWallet();
      this.loans = this.wallet.loans;
    }
    this.walletSubscription = this.walletService.walletSubject
      .subscribe(
        (wallet: Wallet) => {
          this.wallet = wallet;
          this.loans = wallet.loans;
        });

    this.accountFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      description: new FormControl(null, [Validators.maxLength(100)]),
      balance: new FormControl(null, Validators.required),
      minPayment: new FormControl(null, Validators.required),
      interestRate: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const account: Loan = new Loan(this.accountFormGroup.value);
    account.dueDay = 5;
    this.acctService.post(account).subscribe(
      (acct: Loan) => {
        this.wallet.loans.push(acct);
        this.wallet.loans = [...this.wallet.loans];
        this.walletService.walletSubject.next(this.wallet);
      }
    );
    this.accountFormGroup.reset();
  }
}
