import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductCustomerService } from 'src/app/services/customer/product.customer.service';
import { CartService } from 'src/app/services/customer/cart.customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-product-detail',
  templateUrl: './customer-product-detail.component.html',
  styleUrls: ['./customer-product-detail.component.css']
})
export class CustomerProductDetailComponent implements OnInit {
  productDetail: Product;

  constructor(
    private productService: ProductCustomerService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getProduct(params.get("detailpro"));
    });

  }

  getProduct(id: any) {
    this.productService.getProductByID(id).subscribe(pro => {
      this.productDetail = pro as Product;
    })
  }

  addToCart() {
    this.cartService.addToCart(this.productDetail);
    window.alert('You added to cart: ' + this.productDetail.name);
  }

}
