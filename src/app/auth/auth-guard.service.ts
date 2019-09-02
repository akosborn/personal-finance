import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private loggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authState.subscribe(
      (user: SocialUser) => {
        user ? this.loggedIn = true : this.loggedIn = false;
        if (!this.loggedIn) {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.loggedIn) {
      this.router.navigate(['/login']);
    }
    return this.loggedIn;
  }
}
