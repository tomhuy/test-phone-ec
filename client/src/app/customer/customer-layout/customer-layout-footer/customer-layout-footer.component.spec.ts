import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLayoutFooterComponent } from './customer-layout-footer.component';

describe('CustomerLayoutFooterComponent', () => {
  let component: CustomerLayoutFooterComponent;
  let fixture: ComponentFixture<CustomerLayoutFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLayoutFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLayoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
