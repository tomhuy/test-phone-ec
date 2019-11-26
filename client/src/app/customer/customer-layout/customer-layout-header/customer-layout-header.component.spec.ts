import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLayoutHeaderComponent } from './customer-layout-header.component';

describe('CustomerLayoutHeaderComponent', () => {
  let component: CustomerLayoutHeaderComponent;
  let fixture: ComponentFixture<CustomerLayoutHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLayoutHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLayoutHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
