import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideNavToggleService } from './shared/side-nav-toggle.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullWidthDirective } from './shared/full-width.directive';
import {WalletService} from './shared/wallet.service';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SideNavComponent,
    DashboardComponent,
    FullWidthDirective
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [
    SideNavToggleService,
    WalletService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
