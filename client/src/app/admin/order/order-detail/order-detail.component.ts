import { Component, OnInit } from '@angular/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { BaseDetailComponent } from 'src/app/common/base/base-detail';
import { ActionEnum } from 'src/app/common/enums/Actions.enum';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent extends BaseDetailComponent implements OnInit {

  constructor(
    public modal: NzModalRef,
    public fb: FormBuilder,
    public dataSvc?: DataService,
    public notificationService?: NzNotificationService,
  ) {
    super(modal, fb, dataSvc);
  }

  ngOnInit() {
    this.urlItemByID = '/api/invoice';

    super.ngOnInit();

    this.itemForm.addControl('state', new FormControl('', Validators.required));
    this.itemForm.addControl('dateOrdered', new FormControl('', Validators.required));
    this.itemForm.addControl('code', new FormControl('', Validators.required));
    this.itemForm.addControl('receiver', new FormControl('', Validators.required));
    this.itemForm.addControl('address', new FormControl('', Validators.required));
    this.itemForm.addControl('note', new FormControl('', Validators.required));
    this.itemForm.addControl('phoneNumber', new FormControl(1, Validators.required));
    this.itemForm.addControl('typeOfPayment', new FormControl('', Validators.required));

    this.getItem(this.params.id);



  }

  async getItem(id: any) {
    try {
      await super.getItemByID(id);
      // console.log(this.OneItem);
      this.itemForm.patchValue(this.OneItem);
    } catch (e) { console.log(e); }
  }

  // async save() {
  //   try {
  //     // thông báo là hành động thành công
  //     this.MessageAfterActionSuccess();
  //     // tắt modal nếu thành công
  //     super.save();
  //   } catch (e) {
  //     this.MessageAfterActionFail();
  //     console.log(e);
  //   }
  // }

  cancel() {
    super.cancel();
    // this.modal.destroy();
  }

}
