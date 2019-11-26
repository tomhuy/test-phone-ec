import { Component, OnInit } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { BrandDetailComponent } from '../brand-detail/brand-detail.component';
import { BaseListComponent } from 'src/app/common/base/base-list';
import { ActionEnum } from 'src/app/common/enums/Actions.enum';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent extends BaseListComponent implements OnInit {

  constructor(
    public dataService: DataService,
    private modalService: NzModalService,
    public notificationService?: NzNotificationService
  ) {
    super(dataService);
  }

  ngOnInit() {
    this.urlGetItems = '/api/brand/get';
    this.urlDeleteItem = '/api/brand/';
    this.getList();
  }

  async getList(reset = false) {
    if (reset) this.tableInfor.pageIndex = 1;
    this.buildArgs();
    super.getList();
  }

  buildArgs() {

  }

  edit(model: any = null) {
    const modal = this.modalService.create({
      nzTitle: model && model._id ? 'Sửa loại sản phẩm' : 'Thêm loại sản phẩm',
      nzMaskClosable: false,
      nzWidth: 500,
      nzContent: BrandDetailComponent,
      nzComponentParams: {
        params: {
          id: model ? model._id : '',
          action: model ? ActionEnum.Update : ActionEnum.Add
        }
      },
      nzFooter: [{
        label: 'Huỷ bỏ',
        onClick: (component) => {
          component.cancel();
        }
      },
      {
        label: model && model._id ? 'Lưu' : 'Lưu',
        type: 'primary',
        onClick: (component) => {
          component.save();
        }
      }]
    });

    modal.afterClose.subscribe((result) => {
      if (result) {
        this.getList();
      }
    });
  }

  async deleteRecord(id: any) {
    try {
      await super.deleteRecord(id);
      this.notificationService.success('Thông báo', 'Xóa thành thông!');
      this.getList();
    } catch (e) {
      this.notificationService.error('Lỗi', 'Không thể xóa được đối tượng này vì đối tượng này đang được sử dụng!');
      console.log(e);
    }
  }
}
