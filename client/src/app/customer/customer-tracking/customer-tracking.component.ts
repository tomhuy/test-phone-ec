import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-tracking',
  templateUrl: './customer-tracking.component.html',
  styleUrls: ['./customer-tracking.component.css']
})
export class CustomerTrackingComponent implements OnInit {

  invoiceID: any;

  constructor(
    private route: Router
  ) { }

  ngOnInit() {
  }



  onTrack(){
    this.route.navigateByUrl(`/trackshow/${this.invoiceID}`);
  }

}
