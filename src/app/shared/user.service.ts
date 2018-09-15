import { Injectable, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
}
