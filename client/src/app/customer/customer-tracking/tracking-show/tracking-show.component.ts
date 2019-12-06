import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceCustomerService } from 'src/app/services/customer/invoice.customer.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Invoice } from "src/app/models/invoice.model";

@Component({
  selector: 'app-tracking-show',
  templateUrl: './tracking-show.component.html',
  styleUrls: ['./tracking-show.component.css']
})
export class TrackingShowComponent implements OnInit {

  invoice: Invoice;

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceCustomerService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let result = this.invoiceService.getInvoiceByID(params.get("orderid"));
      result.subscribe(x => this.invoice = x[0]);
    });
  }
}
