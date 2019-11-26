import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingInformationDetailComponent } from './setting-information-detail.component';

describe('SettingInformationDetailComponent', () => {
  let component: SettingInformationDetailComponent;
  let fixture: ComponentFixture<SettingInformationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingInformationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingInformationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
