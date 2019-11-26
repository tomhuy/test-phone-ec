import { OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data-service';

export class BaseListComponent implements OnInit {

  items: any = [];
  filterField: any;
  tableInfor: any = {
    loading: false,
    filterField: this.filterField,
    total: 10,
    pageIndex: 1,
    pageSize: 10,

  };

  urlGetItems = '';
  urlDeleteItem = '';

  constructor(
    public dataService: DataService
  ) { }

  ngOnInit() {

  }

  async getList(reset = false) {
    try {
      const res = await this.dataService.getItems(this.urlGetItems, this.tableInfor);
      // console.log(res);
      this.items = res.docs;
      this.tableInfor.total = res.totalDocs;

    } catch (e) { console.log(e); }
  }

  async deleteRecord(id: any) {
    try {
      // const res = await this.dataService.deleteItem(this.urlDeleteItem + `\\${id}`);
      const res = await this.dataService.deleteItem(this.urlDeleteItem + `/${id}`);
      console.log(res);
    } catch (e) { console.log(e); }
  }

  async cancelDelete() {

  }
}
