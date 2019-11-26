import { Injectable } from '@angular/core';
import { Item } from 'src/app/entities/item.entity';
import { Product } from 'src/app/models/product.model';
import { HttpClient } from '@angular/common/http';
// import { ProductCustomerService } from 'src/app/services/customer/product.customer.service';

@Injectable()
export class CartService {
  items: Item[] = [];
  total: number = 0;
  // product: Product;

  constructor(private http: HttpClient) { }

  addToCart(pro: Product) {
    var itemAdd: Item = {
      product: pro,
      quantity: 1
    };
    if (localStorage.getItem("cartBH") == null) {
      // YES => create local storage & push new item
      let cart: any = [];
      cart.push(JSON.stringify(itemAdd));
      localStorage.setItem('cartBH', JSON.stringify(cart));
    } else {
      // NO => retrieve local storage named cart & check this item existed in cart[] or not
      let cart: any = JSON.parse(localStorage.getItem('cartBH'));
      let index: number = -1;
      for (var i = 0; i < cart.length; i++) {
        let item: Item = JSON.parse(cart[i]);
        if (item.product._id == itemAdd.product._id) {
          index = i;
          break;
        }
      }
      // check existed ?
      if (index == -1) {
        // NO exist => push new item in cart
        cart.push(JSON.stringify(itemAdd));
        localStorage.setItem('cartBH', JSON.stringify(cart));
      } else {
        // YES exist => increase the quantity of item
        let item: Item = JSON.parse(cart[index]);
        item.quantity += 1;
        cart[index] = JSON.stringify(item);
        localStorage.setItem("cartBH", JSON.stringify(cart));
      }
    }
  }


  loadCart(): void {
    this.total = 0;
    this.items = [];
    // retrieve existed cart[] in local storage
    let cart = JSON.parse(localStorage.getItem('cartBH'));
    for (var i = 0; i < cart.length; i++) {
      let item = JSON.parse(cart[i]);
      this.items.push({
        product: item.product,
        quantity: item.quantity
      });
      this.total += item.product.price * item.quantity;
    }
  }

  // remove the item in cart[]
  remove(id: string): void {
    let cart: any = JSON.parse(localStorage.getItem('cartBH'));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product._id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('cartBH', JSON.stringify(cart));
    this.loadCart();
  }

  removeItem(name: string): void {
    localStorage.removeItem(name);
  }

  destroy(): void {
    localStorage.clear();
  }

  saveInvoice(data): any {
    return this.http.post('/api/invoice/create', data);
  }


}
