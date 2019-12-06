import { Component, OnInit } from '@angular/core';

import { Item } from 'src/app/entities/item.entity';
import { CartService } from 'src/app/services/customer/cart.customer.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-customer-checkout',
  templateUrl: './customer-checkout.component.html',
  styleUrls: ['./customer-checkout.component.css']
})
export class CustomerCheckoutComponent implements OnInit {
  billForm: any;
  items: Item[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.cartService.loadCart();
    this.refresh();
    this.initForm();
  }

  initForm() {
    this.billForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      note: [''],
    });
  };

  placeOrder() {
    // console.log(this.billForm.status);
    let info = this.billForm.value;
    let data = {
      receiver: info.firstname + ' ' + info.lastname,
      address: info.address,
      email: info.email,
      note: info.note,
      phoneNumber: info.phone,
      typeOfPayment: 'COD',
      products: this.items
    }
    // console.log(data);
    this.cartService.saveInvoice(data).subscribe(async res => {
      console.log(res);
      await window.alert('Ordered successfully. We would send email to confirm you !!!');
      this.router.navigateByUrl('/customer/home');
      this.cartService.destroy();
    });
  }

  refresh() {
    this.items = this.cartService.items;
    this.total = this.cartService.total;
  }

}
