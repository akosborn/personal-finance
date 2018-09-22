import { Component, OnDestroy, OnInit } from '@angular/core';
import { WalletService } from '../shared/wallet.service';
import { CheckingAccount } from '../shared/checking-account.model';
import { Subscription } from 'rxjs';
import { Wallet } from '../shared/wallet.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckingService } from '../checking.service';

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
              private checkingService: CheckingService) { }

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

  onSubmit() {
    const account: CheckingAccount = this.accountFormGroup.value;
    this.checkingService.post(account).subscribe(
      (accounts: CheckingAccount[]) => {
        this.wallet.checkingAccounts = accounts;
        this.walletService.walletSubject.next(this.wallet);
      }
    );
    this.accountFormGroup.reset();
  }

  ngOnDestroy(): void {
    this.walletSubscription.unsubscribe();
  }

}
