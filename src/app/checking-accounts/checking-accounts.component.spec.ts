import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckingAccountsComponent } from './checking-accounts.component';

describe('CheckingAccountsComponent', () => {
  let component: CheckingAccountsComponent;
  let fixture: ComponentFixture<CheckingAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckingAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckingAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
