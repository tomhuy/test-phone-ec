import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOtherAccountComponent } from './login-other-account.component';

describe('LoginOtherAccountComponent', () => {
  let component: LoginOtherAccountComponent;
  let fixture: ComponentFixture<LoginOtherAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginOtherAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOtherAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
