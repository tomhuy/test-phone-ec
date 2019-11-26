import { OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl, FormGroup, FormArray } from '@angular/forms';
import { NzModalRef, NzNotificationService } from 'ng-zorro-antd';
import { ActionEnum } from '../enums/Actions.enum';
import { DataService } from 'src/app/services/data-service';

export class BaseDetailComponent implements OnInit {
  urlItemByID = '';
  urlSaveItem = '';
  urlUpdateByID = '';

  OneItem: any;

  itemForm: any;
  @Input() params: any;

  constructor(
    public modal?: NzModalRef,
    public fb?: FormBuilder,
    public dataService?: DataService,
    public notificationService?: NzNotificationService,
  ) { }

  ngOnInit() {

    this.itemForm = this.fb.group({
    });

    if (this.params.action === ActionEnum.Update) {
      this.itemForm.addControl('_id', new FormControl(''));
    }

  }

  async getItemByID(id: any) {
    try {
      const res = await this.dataService.getItemByID(this.urlItemByID + `/${id}`);
      this.OneItem = res;
    } catch (e) { console.log(e); }
  }

  async updateItemByID(id: any, model: any) {
    try {
      const res = await this.dataService.updateItem(this.urlUpdateByID + `/${id}`, model);
      console.log(res);
    } catch (e) { console.log(e); }
  }

  save() {
    this.modal.destroy({ success: true });
  }

  cancel() {
    this.modal.destroy();
  }
  MessageAfterActionSuccess() {
    const message = (this.params.action === ActionEnum.Add ? 'Thêm' : 'Cập nhật') + ' thành công';
    this.notificationService.success('Thông báo', message);
  }

  MessageAfterActionFail() {
    const message = (this.params.action === ActionEnum.Add ? 'Thêm' : 'Cập nhật') + ' thất bại';
    this.notificationService.error('Thông báo', message);
  }

  triggerValidation(control: AbstractControl) {
    if (control instanceof FormGroup) {
      const group = (control as FormGroup);

      for (const field in group.controls) {
        const c = group.controls[field];

        this.triggerValidation(c);
      }
    }
    else if (control instanceof FormArray) {
      const group = (control as FormArray);

      for (const field in group.controls) {
        const c = group.controls[field];

        this.triggerValidation(c);
      }
    }

  }
}
