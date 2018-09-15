import { Component, OnDestroy, OnInit } from '@angular/core';
import { WalletService } from '../shared/wallet.service';
import { CheckingAccount } from '../shared/checking-account.model';
import { Subscription } from 'rxjs';
import { Wallet } from '../shared/wallet.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checking-accounts',
  templateUrl: './checking-accounts.component.html',
  styleUrls: ['./checking-accounts.component.css']
})
export class CheckingAccountsComponent implements OnInit, OnDestroy {

  checkingAccounts: CheckingAccount[];
  walletSubscription: Subscription;
  accountFormGroup: FormGroup;

  constructor(private walletService: WalletService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // check if wallet initialized
    if (this.walletService.getWallet()) {
      this.checkingAccounts = this.walletService.getWallet().checkingAccounts;
    }
    this.walletSubscription = this.walletService.walletSubject
      .subscribe(
        (wallet: Wallet) => this.checkingAccounts = wallet.checkingAccounts
      );

    const action = this.activatedRoute.snapshot.params['action'];

    this.accountFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.maxLength(100)]),
      balance: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.accountFormGroup.value, this.accountFormGroup.valid);
  }

  ngOnDestroy(): void {
    this.walletSubscription.unsubscribe();
  }

}
