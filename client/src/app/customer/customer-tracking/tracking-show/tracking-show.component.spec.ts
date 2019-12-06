import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingShowComponent } from './tracking-show.component';

describe('TrackingShowComponent', () => {
  let component: TrackingShowComponent;
  let fixture: ComponentFixture<TrackingShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
