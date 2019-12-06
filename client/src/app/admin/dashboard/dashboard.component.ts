import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data-service';
import { BaseListComponent } from 'src/app/common/base/base-list';
import { groupBy } from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseListComponent implements OnInit {

  //view: any[] = [700, 400];

  // // options
  // showXAxis = true;
  // showYAxis = true;
  // gradient = false;
  // showLegend = true;
  // showXAxisLabel = true;
  // xAxisLabel = 'Number';
  // showYAxisLabel = true;
  // yAxisLabel = 'Color Value';
  // timeline = true;

  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };

  // multi: any[] = [
  //   {
  //     name: 'Cyan',
  //     series: [
  //       {
  //         name: 5,
  //         value: 2650
  //       },
  //       {
  //         name: 10,
  //         value: 2800      },
  //       {
  //         name: 15,
  //         value: 2000
  //       }
  //     ]
  //   },
  //   {
  //     name: 'Yellow',
  //     series: [
  //       {
  //         name: 5,
  //         value: 2500
  //       },
  //       {
  //         name: 10,
  //         value: 3100
  //       },
  //       {
  //         name: 15,
  //         value: 2350
  //       }
  //     ]
  //   }
  // ];
  /**
   *
   */

  single = [
    // {
    //   "name": "Germany",
    //   "value": 40632,
    //   "extra": {
    //     "code": "de"
    //   }
    // },
    // {
    //   "name": "United States",
    //   "value": 50000,
    //   "extra": {
    //     "code": "us"
    //   }
    // },
    // {
    //   "name": "France",
    //   "value": 36745,
    //   "extra": {
    //     "code": "fr"
    //   }
    // },
    // {
    //   "name": "United Kingdom",
    //   "value": 36240,
    //   "extra": {
    //     "code": "uk"
    //   }
    // },
    // {
    //   "name": "Spain",
    //   "value": 33000,
    //   "extra": {
    //     "code": "es"
    //   }
    // },
    // {
    //   "name": "Italy",
    //   "value": 35800,
    //   "extra": {
    //     "code": "it"
    //   }
    // }
  ];

  multi: any[];

  view: any[] = [900, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Sản phẩm';
  showYAxisLabel = true;
  yAxisLabel = 'Số lượng bán được';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  infoDashboard = {
    noSent: 0,
    noDelivery: 0,
    total: 0,
    noInvoice: 0
  };

  urlGetItems = '/api/invoice/get';
  urlGetInfoNumberInvoice = '/api/invoice/thongke';

  onSelect(event) {
    console.log(event);
  }

  constructor(
    public dataService: DataService,
  ) {
    super(dataService);
  }

  async ngOnInit() {
    // this.tableInfor['status'] = 'Sent';
    await this.getList();
    this.transformData();
    console.log(this.items);
    // this.getInfoForStaticZorro();
  }

  // async getInfoForStaticZorro() {
  //   try {
  //     let res = await this.dataService.getItems(this.urlGetInfoNumberInvoice, {});
  //     this.infoDashboard = res;
  //     console.log(res);
  //   } catch (e) { console.log(e); }
  // }

  transformData() {
    if (this.items.length) {
      let products: any = [];

      const startOfMonth = moment().startOf('month').toDate();
      const endOfMonth = moment().endOf('month').add(1, 'days').toDate();
      // this.items = this.items.filter(item => item.dateOrdered >= startOfMonth && item.dateOrdered < endOfMonth);

      this.infoDashboard = this.findInfo(this.items);
      console.log(this.items);
      this.items.forEach(ivc => {
        if (ivc.products.length > 0) {
          ivc.products.forEach(p => {
            products.push(p);
          });
        }
      });
      products = groupBy(products, 'product._id');

      let data_transform = [];
      Object.keys(products).forEach(key => {
        let nObject = {
          name: '',
          value: 0,
          extra: {
            code: ''
          }
        };
        for (let i = 0; i < products[key].length; i++) {
          if (i === 0) {
            nObject.name = products[key][i].product.name;
            nObject.extra.code = products[key][i].product.alias;
          }
          nObject.value += products[key][i].quantity;
        }

        data_transform.push(nObject);
      });
      this.single = data_transform;
    }
  }

  // tim ra các infor sau   infoDashboard = { 'nosent': 5, 'nodelivery': 1, 'total': 59920009, 'noInvoice': 1 };

  findInfo(items: any) {
    let result = {
      noSent: 0,
      noDelivery: 0,
      total: 0,
      noInvoice: 0
    };
    items.forEach(item => {
      if (item.state === 'Sent') result.noSent++;
      else if (item.state === 'Delivering') result.noDelivery++;
      else if (item.state === 'Closed') result.noInvoice++;

      let total = 0;
      item.products.forEach(p => {
        total += p.product.promotion * p.quantity;
      });
      result.total = total;
    });
    console.log(result);
    return result;
  }
}
