import {Component, OnInit} from '@angular/core';
import {SideNavToggleService} from '../shared/side-nav-toggle.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  constructor(private sideNavToggleService: SideNavToggleService) {}

  ngOnInit() {
  }

  onToggleSidebar() {
    const sideNavCollapsed = this.sideNavToggleService.isCollapsed();
    this.sideNavToggleService.setCollapsed(!sideNavCollapsed);
  }
}
