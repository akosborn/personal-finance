import { Component, OnInit } from '@angular/core';
import { SideNavToggleService } from '../shared/side-nav-toggle.service';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private sideNavToggleService: SideNavToggleService,
              private authService: AuthService) {}

  ngOnInit() {
    this.authService.authState.subscribe(
      (user) => {
        this.user = user;
        this.loggedIn = (user != null);
      }
    );
  }

  onToggleSidebar(): void {
    const sideNavCollapsed = this.sideNavToggleService.isCollapsed();
    this.sideNavToggleService.setCollapsed(!sideNavCollapsed);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}
