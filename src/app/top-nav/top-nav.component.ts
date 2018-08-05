import { Component, OnInit } from '@angular/core';
import { SideNavToggleService } from '../shared/side-nav-toggle.service';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;
  private authStateObservable: Observable<boolean> = this.authService.authState.pipe(
    map(
      (user) => {
        return !!user;
      }
    )
  );

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
