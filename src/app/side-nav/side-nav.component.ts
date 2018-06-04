import { Component, OnInit } from '@angular/core';
import {SideNavToggleService} from '../shared/side-nav-toggle.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  private collapsed = false;

  constructor(private sideNavToggleService: SideNavToggleService) {}

  ngOnInit() {
    this.sideNavToggleService.collapsedChanged
      .subscribe(
        (collapsed: boolean) => {
          this.collapsed = collapsed;
        }
      );
  }

}
