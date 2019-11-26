import { Component, OnInit } from '@angular/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BaseDetailComponent } from 'src/app/common/base/base-detail';
import { ActionEnum } from 'src/app/common/enums/Actions.enum';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-setting-information-detail',
  templateUrl: './setting-information-detail.component.html',
  styleUrls: ['./setting-information-detail.component.css']
})
export class SettingInformationDetailComponent extends BaseDetailComponent implements OnInit {

  constructor(
    public modal: NzModalRef,
    public fb: FormBuilder,
    public dataSvc?: DataService,
    public notificationService?: NzNotificationService,
  ) {
    super(modal, fb, dataSvc);
  }

  ngOnInit() {
    this.urlItemByID = '/api/info';
    this.urlSaveItem = '/api/info';
    this.urlUpdateByID = '/api/info';
    super.ngOnInit();
    this.itemForm.addControl('name', new FormControl('', Validators.required));
    this.itemForm.addControl('phoneNumb', new FormControl(1, Validators.required));
    this.itemForm.addControl('address', new FormControl('', Validators.required));
    this.itemForm.addControl('email', new FormControl('', Validators.required));
    this.itemForm.addControl('company', new FormControl('', Validators.required));
    this.itemForm.addControl('date', new FormControl('', Validators.required));

    this.getItem(this.params.id);

  }

  async getItem(id: any) {
    try {
      await super.getItemByID(id);
      // console.log(this.OneItem);
      this.itemForm.patchValue(this.OneItem);
    } catch (e) { console.log(e); }
  }

  async save() {
    try {
      if (!this.itemForm.invalid) {
        let dataItem = this.itemForm.value;
        // tslint:disable-next-line: max-line-length
        await super.updateItemByID(dataItem._id, dataItem);

        // thông báo là hành động thành công
        this.MessageAfterActionSuccess();

        // tắt modal nếu thành công
        super.save();
      } else {
        this.triggerValidation(this.itemForm);
      }
    } catch (e) {
      this.MessageAfterActionFail();
      console.log(e);
    }
  }

  cancel() {
    super.cancel();
    // this.modal.destroy();
  }
}
