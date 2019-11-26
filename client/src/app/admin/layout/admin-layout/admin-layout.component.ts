import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LoadScriptService } from 'src/app/services/load-scripts.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
declare var Quill: any;

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  isCollapsed = false;
  constructor(
        // ...
        private auth: AuthenticationService,
        private readonly svc: LoadScriptService,
        @Inject(DOCUMENT) private readonly document: any
  ) { }

  ngOnInit() {
    // this.svc.lazyLoadQuill().subscribe(_ => {
    //   if (!Quill) {
    //     Quill = this.document.defaultView.Quill;
    //   }
    //   this.setupQuill();
    // });
  }

  setupQuill() {
    if (!Quill) {
      return;
    }
  }
  logout(): void {
    this.auth.logoutAdmin();
  }

}
