import { Injectable, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { HttpHeaders } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { Wallet } from './wallet.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions: { headers: HttpHeaders };
  private wallet: Wallet;
  walletSubject: Subject<Wallet> = new Subject<Wallet>();
  authSub: Subscription;
}
