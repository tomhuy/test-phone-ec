import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductCustomerService } from 'src/app/services/customer/product.customer.service';
import { CartService } from 'src/app/services/customer/cart.customer.service';


@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {


  proPromote: Product[];
  proBestSeller: Product;
  proLatest: Product[];


  constructor(private productService: ProductCustomerService, private cartService: CartService) { }

  ngOnInit() {
    this.getProductPromotion();
    this.getProBestSeller();
    this.getProLatest();
  }

  getProductPromotion() {
    let option = {
      pageIndex: 1,
      pageSize: 3
    };
    this.productService.getProduct(option).subscribe(res => {
      this.proPromote = res.docs;
    });
  }

  getProBestSeller() {
    let option = {
      pageIndex: 1,
      pageSize: 1
    };
    this.productService.getProduct(option).subscribe(res => {
      this.proBestSeller = res.docs[0];
      console.log(this.proBestSeller);
    });
  }

  getProLatest() {
    let option = {
      pageIndex: 1,
      pageSize: 4
    };
    this.productService.getProduct(option).subscribe(res => {
      this.proLatest = res.docs;
      // console.log(this.proLatest);
    });
  }

  addToCart(){
    this.cartService.addToCart(this.proBestSeller);
    window.alert('You added to cart: ' + this.proBestSeller.name);
  }

  setValue(id: string) {
    this.productService.setProductID(id);
  }

}
