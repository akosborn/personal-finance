import { Component, OnDestroy, OnInit } from '@angular/core';
import { WalletService } from '../shared/wallet.service';
import { CheckingAccount } from '../shared/checking-account.model';
import { Subscription } from 'rxjs';
import { Wallet } from '../shared/wallet.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-checking-accounts',
  templateUrl: './checking-accounts.component.html',
  styleUrls: ['./checking-accounts.component.css']
})
export class CheckingAccountsComponent implements OnInit, OnDestroy {

  wallet: Wallet;
  checkingAccounts: CheckingAccount[];
  walletSubscription: Subscription;
  accountFormGroup: FormGroup;

  constructor(private walletService: WalletService,
              private activatedRoute: ActivatedRoute,
              private accountService: AccountService) { }

  ngOnInit() {
    // check if wallet initialized
    if (this.walletService.getWallet()) {
      this.wallet = this.walletService.getWallet();
      this.checkingAccounts = this.walletService.getWallet().checkingAccounts;
    }
    this.walletSubscription = this.walletService.walletSubject
      .subscribe(
        (wallet: Wallet) => {
          this.wallet = wallet;
          this.checkingAccounts = this.wallet.checkingAccounts;
        }
      );

    const action = this.activatedRoute.snapshot.params['action'];

    this.accountFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      description: new FormControl(null, [Validators.maxLength(100)]),
      balance: new FormControl(null, Validators.required)
    });
  }

  onAddAccount() {
    const account: CheckingAccount = new CheckingAccount(this.accountFormGroup.value);
    this.accountService.post(account).subscribe(
      (acct: CheckingAccount) => {
        this.wallet.checkingAccounts.push(acct);
        this.walletService.walletSubject.next(this.wallet);
      }
    );
    this.accountFormGroup.reset();
  }

  onDeleteAccount(id: number): void {
    this.accountService.delete(id).subscribe(
      (succ: any) => {
        this.checkingAccounts = this.checkingAccounts.filter(acct => acct.id !== id);
        this.walletService.loadWallet().subscribe(
          (wallet: Wallet) => this.walletService.walletSubject.next(wallet)
        );
      },
      (err: any) => {
        // TODO: - Handle error by displaying message in view
        console.log(err.message);
      }
    );
  }

  ngOnDestroy(): void {
    this.walletSubscription.unsubscribe();
  }

}
