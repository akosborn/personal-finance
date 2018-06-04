import { TestBed, inject } from '@angular/core/testing';

import { SideNavToggleService } from './side-nav-toggle.service';

describe('SideNavToggleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SideNavToggleService]
    });
  });

  it('should be created', inject([SideNavToggleService], (service: SideNavToggleService) => {
    expect(service).toBeTruthy();
  }));
});
