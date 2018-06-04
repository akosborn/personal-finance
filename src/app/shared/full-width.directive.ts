import {Directive, HostBinding, OnInit} from '@angular/core';
import {SideNavToggleService} from './side-nav-toggle.service';

@Directive({
  selector: '[appFullWidth]'
})
export class FullWidthDirective implements OnInit {
  @HostBinding('class.col-md-9') colMd9 = true;
  @HostBinding('class.ml-sm-auto') colMlSmAuto = true;
  @HostBinding('class.col-lg-10') colLg10 = true;
  @HostBinding('class.col-12') col12 = false;

  constructor(private sideNavToggleService: SideNavToggleService) { }

  ngOnInit(): void {
    this.sideNavToggleService.collapsedChanged
      .subscribe(
        (collapsed: boolean) => {
          this.colMd9 = !collapsed;
          this.colMlSmAuto = !collapsed;
          this.colLg10 = !collapsed;
          this.col12 = collapsed;
        }
      );
  }
}
