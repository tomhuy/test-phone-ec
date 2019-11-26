import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductDetailComponent } from './customer-product-detail.component';

describe('CustomerProductDetailComponent', () => {
  let component: CustomerProductDetailComponent;
  let fixture: ComponentFixture<CustomerProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
