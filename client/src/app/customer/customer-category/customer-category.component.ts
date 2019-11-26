import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { TypeProduct } from 'src/app/models/typeproduct.model';
import { Brand } from 'src/app/models/brand.model';
import { categoryService } from 'src/app/services/customer/category.customer.service';
import { ProductCustomerService } from 'src/app/services/customer/product.customer.service';

@Component({
  selector: 'app-customer-category',
  templateUrl: './customer-category.component.html',
  styleUrls: ['./customer-category.component.css']
})
export class CustomerCategoryComponent implements OnInit {

  products: Product[];
  brands: Brand[];
  typeProducts: TypeProduct[];
  selectedType: string;
  selectedBrand: string;

  // pagination setting
  page = 1;
  pageSize = 6;
  pages: Array<number>;

  constructor(private CategoryService: categoryService, private productService: ProductCustomerService) { }

  ngOnInit() {
    this.selectedType = 'All';
    this.selectedBrand = 'All';
    this.getProduct();
    this.getTypeProduct();
    this.getBrand();
  }
  setPage(i, event: any) {
    event.preventDefault();
    this.page = i + 1;
    this.filter();
    // console.log('page: ' + this.page);
  }

  getProduct() {
    let option = {
      pageIndex: this.page,
      pageSize: this.pageSize
    };
    this.CategoryService.getProduct(option).subscribe(res => {
      this.products = res.docs;
      this.pages = new Array(res.totalPages);
    });
  }

  getProductWithBrand() {
    let option = {
      pageIndex: this.page,
      pageSize: this.pageSize,
      brand_id: this.selectedBrand
    };
    this.CategoryService.getProductFilter(option).subscribe(res => {
      this.products = res.docs;
      this.pages = new Array(res.totalPages);
    });
  }

  getProductWithType() {
    let option = {
      pageIndex: this.page,
      pageSize: this.pageSize,
      typeproduct_id: this.selectedType
    };
    this.CategoryService.getProductFilter(option).subscribe(res => {
      this.products = res.docs;
      this.pages = new Array(res.totalPages);
    });
  }

  getProductWithTypeBrand() {
    let option = {
      pageIndex: this.page,
      pageSize: this.pageSize,
      typeproduct_id: this.selectedType,
      brand_id: this.selectedBrand
    };
    this.CategoryService.getProductFilter(option).subscribe(res => {
      this.products = res.docs;
      this.pages = new Array(res.totalPages);
    });
  }


  getTypeProduct() {
    let option = {
      orderField: 'no',
      orderBy: 'asc'
    };
    this.CategoryService.getType(option).subscribe(res => {
      console.log(res.doc);
      this.typeProducts = res.docs;
    });
  }

  getBrand() {
    let option = '';
    this.CategoryService.getBrand(option).subscribe(res => {
      this.brands = res.docs;
    });
  }

  filter() {
    if (this.selectedType === 'All' && this.selectedBrand === 'All') {
      // this.getProduct();
      // console.log('get all');
      this.getProduct();
    } else {
      if (this.selectedType === 'All') {
        // console.log('all type & specific brand');
        this.getProductWithBrand();
        return;
      }
      if (this.selectedBrand === 'All') {
        // console.log('all brand & specific type');
        this.getProductWithType();
        return;
      }
      // console.log('specifice type & specifice brand');
      this.getProductWithTypeBrand();

    }
  }

  onChooseType(_id: string) {
    this.selectedType = _id;
    this.filter();

  }
  onChooseBrand(_id: string) {
    this.selectedBrand = _id;
    this.filter();
  }

  // setValue(id: string) {
  //   this.productService.setProductID(id);
  // }

}
