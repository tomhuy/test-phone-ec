import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/common/base/base-list';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ActionEnum } from 'src/app/common/enums/Actions.enum';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseListComponent implements OnInit {

  constructor(
    public dataService: DataService,
    private modalService: NzModalService,
    public notificationService?: NzNotificationService
  ) {
    super(dataService);
  }

  ngOnInit() {
    this.urlGetItems = '/api/product/get';
    this.urlDeleteItem = '/api/product/';
    this.getList();
  }

  async getList(reset = false) {
    if (reset)
      this.tableInfor.pageIndex = 1;
    this.buildArgs();
    super.getList();
  }

  buildArgs() {

  }

  edit(model: any = null) {
    const modal = this.modalService.create({
      nzTitle: model && model._id ? 'Sửa sản phẩm' : 'Thêm sản phẩm',
      nzMaskClosable: false,
      nzWidth: 800,
      nzContent: ProductDetailComponent,
      nzComponentParams: {
        params: {
          _id: model ? model._id : '',
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
        label: model && model.id ? 'Lưu' : 'Lưu',
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

  async Approve(id: any) {
    try {
      await super.deleteRecord(id);
      this.notificationService.success('Thông báo', 'Đã duyệt thành thông!');
      this.getList();
    } catch (e) {
      this.notificationService.error('Lỗi', 'Không thể duyệt được đối tượng này!');
      console.log(e);
    }
  }
}
