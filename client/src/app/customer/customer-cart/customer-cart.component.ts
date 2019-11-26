import { Component, OnInit } from '@angular/core';

import { Item } from 'src/app/entities/item.entity';
import { CartService } from 'src/app/services/customer/cart.customer.service';

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent implements OnInit {
  items: Item[] = [];
  total: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.loadCart();
    this.refresh();
  }

  remove(id: string) {
    this.cartService.remove(id);
    this.refresh();
  }

  refresh() {
    this.items = this.cartService.items;
    this.total = this.cartService.total;
  }
  updateCart() {
    this.cartService.loadCart();
    this.refresh();
  }

}
