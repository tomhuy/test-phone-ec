import { Component, OnInit } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { SettingInformationDetailComponent } from '../setting-information-detail/setting-information-detail.component';
import { BaseListComponent } from 'src/app/common/base/base-list';
import { ActionEnum } from 'src/app/common/enums/Actions.enum';
import { DataService } from 'src/app/services/data-service';
import { StoreInfoService } from "src/app/services/customer/store-info.service";

@Component({
  selector: 'app-setting-information-list',
  templateUrl: './setting-information-list.component.html',
  styleUrls: ['./setting-information-list.component.css']
})
export class SettingInformationListComponent extends BaseListComponent implements OnInit {

  constructor(
    public dataService: DataService,
    private modalService: NzModalService,
    public notificationService?: NzNotificationService,
    private storeInfoService?: StoreInfoService
  ) {
    super(dataService);
  }

  ngOnInit() {
    this.urlGetItems = '/api/info';
    this.getList();
  }

  async getList(reset = false) {
    if (reset) this.tableInfor.pageIndex = 1;
    this.buildArgs();
    try {
      this.storeInfoService.getStoreInfo().subscribe(res => {
        this.items = res;
        this.tableInfor.total = 1;
      });


    } catch (e) { console.log(e); }
  }

  buildArgs() {

  }

  edit(model: any = null) {
    const modal = this.modalService.create({
      nzTitle: 'Sửa loại thông tin',
      nzMaskClosable: false,
      nzWidth: 500,
      nzContent: SettingInformationDetailComponent,
      nzComponentParams: {
        params: {
          id: model._id,
          action: ActionEnum.Update
        }
      },
      nzFooter: [{
        label: 'Huỷ bỏ',
        onClick: (component) => {
          component.cancel();
        }
      },
      {
        label: 'Lưu',
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


}
