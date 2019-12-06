import { Component, OnInit } from '@angular/core';
import { BaseDetailComponent } from 'src/app/common/base/base-detail';
import { NzModalRef, UploadFile, NzNotificationService } from 'ng-zorro-antd';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActionEnum } from 'src/app/common/enums/Actions.enum';
import { categoryService } from 'src/app/services/customer/category.customer.service';
import { ProductCustomerService } from 'src/app/services/customer/product.customer.service';
import { DataService } from 'src/app/services/data-service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent extends BaseDetailComponent implements OnInit {

  isPhone = false;


  typeProducts: any;
  brands: any;

  images = {
    imagePaths: {
      filesToUpload: [],
      downloading: false,
      uploading: false,
      base64Image: ''
    }
  };


  constructor(
    public modal?: NzModalRef,
    public fb?: FormBuilder,
    public notificationService?: NzNotificationService,
    public dataSvc?: DataService,
    public categorySvc?: categoryService,
    public productSvc?: ProductCustomerService
  ) {
    super(modal, fb, dataSvc, notificationService);
  }


  ngOnInit() {
    this.urlItemByID = '/api/product';
    this.urlSaveItem = '/api/product/create';
    this.urlUpdateByID = '/api/product';

    super.ngOnInit();
    this.getTypeProduct();
    this.getBrand();

    console.log(this.params);

    this.itemForm.addControl('name', new FormControl(''));
    this.itemForm.addControl('price', new FormControl(0));
    this.itemForm.addControl('promotion', new FormControl(0));
    this.itemForm.addControl('typeProduct', new FormControl(''));
    this.itemForm.addControl('brand', new FormControl(''));
    this.itemForm.addControl('imagePaths', new FormControl(''));
    this.itemForm.addControl('quantity', new FormControl(0));
    this.itemForm.addControl('description', new FormControl(''));
    this.itemForm.addControl('alias', new FormControl(''));

    this.itemForm.addControl('isPhone', new FormControl(false));

    // this.itemForm.addControl('imagePaths', new FormControl(''));


    this.itemForm.addControl('phoneInfo', this.fb.group({
      screenSize: [],
      frontCam: [],
      backCam: [],
      cpu: [],
      ram: [],
      storageCapacity: [],
      memoryCard: [],
      sim: [],
      os: [],
    }));

    if (this.params.action === ActionEnum.Update) {
      this.getItem(this.params._id);
    }
  }

  async getItem(id: string) {
    try {
      await super.getItemByID(id);
      // console.log(this.OneItem);
      this.itemForm.patchValue(this.OneItem);
    } catch (e) { console.log(e); }
  }

  async getTypeProduct() {
    let option = {
      orderField: 'no',
      orderBy: 'asc'
    };
    this.categorySvc.getType(option).subscribe(res => {
      this.typeProducts = res.docs;
    });
  }

  async getBrand() {
    let option = '';
    this.categorySvc.getBrand(option).subscribe(res => {
      this.brands = res.docs;
    });
  }



  async save() {
    try {
      if (!this.itemForm.invalid) {
        let dataItem = this.itemForm.value;
        // tslint:disable-next-line: max-line-length
        if (this.params.action === ActionEnum.Add) {
          const res = await this.dataService.addItem(this.urlSaveItem, dataItem);
          console.log(res);
          // console.log(dataItem);
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


  // upload image
  beforeUploadImage = (file: UploadFile): boolean => {
    return this.beforeUpload(file, 'imagePaths');
  }

  beforeUpload(file: UploadFile, type: string) {
    this.images[type].filesToUpload = [...[file]];
    //kiểm tra kích thước file
    const isLt2M = file.size / 1024 / 1024 <= 2;
    if (!isLt2M) {
      this.notificationService.create('error', 'Hình ảnh không được lớn hơn 2MB!', '');
      return;
    }
    return false;
  }

  async handleUpload(formControlName: string) {
    const formData = new FormData();
    this.images[formControlName]['filesToUpload'].forEach((file: any) => {
      // formData.append('files[]', file);
      formData.append('productImage', file);
    });

    // call service đẩy hình ảnh lên server tại chỗ này
    this.productSvc.uploadAnh(formData).subscribe(res => {
      // sau khi đấy lên thành công thì gán đường dẫn vào cái formcontrol là image
      // this.itemForm.get('imagePaths').setValue('https://phone-shop-server-huybao.herokuapp.com/assets/'+res); // thây  thế cái emty bằng path của hình ảnh vừa được tải lên
      this.itemForm.get('imagePaths').setValue('data:image/png;base64,' + res);
    });




  }


}
