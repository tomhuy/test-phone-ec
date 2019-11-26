import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeDetailComponent } from './product-type-detail.component';

describe('ProductTypeDetailComponent', () => {
  let component: ProductTypeDetailComponent;
  let fixture: ComponentFixture<ProductTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
