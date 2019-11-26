import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BaseDetailComponent } from 'src/app/common/base/base-detail';
import { ActionEnum } from 'src/app/common/enums/Actions.enum';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent extends BaseDetailComponent implements OnInit {

  constructor(
    public modal: NzModalRef,
    public fb: FormBuilder,
    public dataSvc?: DataService,
    public notificationService?: NzNotificationService,
  ) {
    super(modal, fb, dataSvc);
  }

  ngOnInit() {
    this.urlItemByID = '/api/brand';
    this.urlSaveItem = '/api/brand/create';
    this.urlUpdateByID = '/api/brand';
    super.ngOnInit();
    this.itemForm.addControl('name', new FormControl('', Validators.required));
    this.itemForm.addControl('no', new FormControl(1, Validators.required));
    this.itemForm.addControl('alias', new FormControl('', Validators.required));

    if (this.params.action === ActionEnum.Update) {
      this.getItem(this.params.id);
    }
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
        if (this.params.action === ActionEnum.Add) {
          const res = await this.dataService.addItem(this.urlSaveItem, dataItem);
          console.log(res);
        } else {
          await super.updateItemByID(dataItem._id, dataItem);

        }


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
