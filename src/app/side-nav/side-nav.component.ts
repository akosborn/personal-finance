import {Component, HostListener, OnInit} from '@angular/core';
import {SideNavToggleService} from '../shared/side-nav-toggle.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  private collapsed;
  private screenWidth;
  @HostListener('window:resize', ['$event']) onResize(event?) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 767) {
      this.sideNavToggleService.setCollapsed(false);
    } else {
      this.sideNavToggleService.setCollapsed(true);
    }
  }

  constructor(private sideNavToggleService: SideNavToggleService) {}

  ngOnInit() {
    this.onResize();
    this.collapsed = this.sideNavToggleService.isCollapsed();
    this.sideNavToggleService.collapsedChanged
      .subscribe(
        (collapsed: boolean) => {
          this.collapsed = collapsed;
        }
      );
  }
}
