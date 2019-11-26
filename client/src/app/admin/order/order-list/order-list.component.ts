import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/common/base/base-list';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { ActionEnum } from 'src/app/common/enums/Actions.enum';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent extends BaseListComponent implements OnInit {


  urlUpdateItem: any;
  // Sent', ''Approved'', 'Delivering', 'Closed'
  statuses = [
    { name: 'Sent', value: 'Sent' },
    { name: 'Approved', value: 'Approved' },
    { name: 'Delivering', value: 'Delivering' },
    { name: 'Closed', value: 'Closed' }
  ];

  constructor(
    public dataService: DataService,
    private modalService: NzModalService,
    public notificationService?: NzNotificationService
  ) {
    super(dataService);
  }

  ngOnInit() {

    this.tableInfor['status'] = 'Sent';

    this.urlGetItems = '/api/invoice/get';
    this.urlUpdateItem = '/api/invoice/';
    this.getList();
  }

  optionChange() {
    this.getList();
  }

  async getList(reset = false) {
    if (reset)
      this.tableInfor.pageIndex = 1;
    this.buildArgs();
    super.getList();
  }

  buildArgs() {
    this.filterField = this.tableInfor.status;
  }

  detail(model: any = null) {
    const modal = this.modalService.create({
      nzTitle: 'Thông tin chi tiết',
      nzMaskClosable: false,
      nzWidth: 500,
      nzContent: OrderDetailComponent,
      nzComponentParams: {
        params: {
          id: model._id,
          action: ActionEnum.Update
        }
      },
      nzFooter: [{
        label: 'Done',
        type: 'primary',
        onClick: (component) => {
          component.cancel();
        }
      }]
    });

    modal.afterClose.subscribe((result) => {
      if (result) {
        this.getList();
      }
    });
  }

  async OptionState(id: any) {
    try {
      switch (this.tableInfor.status) {
        case 'Sent':
          this.dataService.updateItem(this.urlUpdateItem + `/${id}`, { state: 'Approved' });
          this.notificationService.success('Thông báo', 'Đổi thành thông!');
          break;
        case 'Approved':
          this.dataService.updateItem(this.urlUpdateItem + `/${id}`, { state: 'Delivering' });
          this.notificationService.success('Thông báo', 'Đổi thành thông!');
          break;
        case 'Delivering':
          this.dataService.updateItem(this.urlUpdateItem + `/${id}`, { state: 'Closed' });
          this.notificationService.success('Thông báo', 'Đổi thành thông!');
          break;
      }

      this.getList();
    } catch (e) {
      this.notificationService.error('Lỗi', 'Không thể đổi được đối tượng này vì đối tượng này đang được sử dụng!');
      console.log(e);
    }
  }


}
