import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingInformationListComponent } from './setting-information-list.component';

describe('SettingInformationListComponent', () => {
  let component: SettingInformationListComponent;
  let fixture: ComponentFixture<SettingInformationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingInformationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingInformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
