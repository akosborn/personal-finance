import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class SideNavToggleService {
  collapsedChanged = new Subject<boolean>();
  private collapsed = true;

  constructor() { }

  isCollapsed() {
    return this.collapsed;
  }

  setCollapsed(collapsed: boolean) {
    this.collapsed = collapsed;
    this.collapsedChanged.next(this.collapsed);
  }
}
