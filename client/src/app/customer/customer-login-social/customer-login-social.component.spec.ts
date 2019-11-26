import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLoginSocialComponent } from './customer-login-social.component';

describe('CustomerLoginSocialComponent', () => {
  let component: CustomerLoginSocialComponent;
  let fixture: ComponentFixture<CustomerLoginSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLoginSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLoginSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
