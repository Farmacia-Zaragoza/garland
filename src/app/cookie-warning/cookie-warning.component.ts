import { PageService } from "./../page.service";
import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

import {
  // bounceInRightAnimation,
  // bounceInLeftAnimation,
  // bounceOutRightAnimation,
  // bounceOutLeftAnimation,
  bounceInUpOnEnterAnimation,
  bounceOutDownOnLeaveAnimation
} from "angular-animations";

@Component({
  selector: "cookie-warning",
  templateUrl: "./cookie-warning.component.html",
  styleUrls: ["./cookie-warning.component.scss"],
  animations: [bounceInUpOnEnterAnimation(), bounceOutDownOnLeaveAnimation()]
})
export class CookieWarningComponent implements OnInit {
  constructor(
    private service: PageService,
    private cookieService: CookieService
  ) {}

  trigger = false;
  delay = 1000;
  autoTimeOut = 15 * 1000;
  timeOutHandler: any;
  cookieName = "brqx";
  message: string;

  ngOnInit() {
    this.service.done.subscribe(() => {
      this.message = this.service.cookieMessage;
      setTimeout(() => {
        if (this.cookieService.get(this.cookieName)) {
          console.log("cookie already present ------------");
          return;
        }
        this.trigger = true;
        this.timeout();
      }, this.delay);
    });
  }

  timeout() {
    this.timeOutHandler = setTimeout(() => {
      this.trigger = false;
    }, this.autoTimeOut);
  }

  clearTimeout() {
    if (this.timeOutHandler) clearTimeout(this.timeOutHandler);
  }

  denied() {
    this.clearTimeout();
    this.trigger = false;
    // console.log("denied");
  }

  accepted() {
    this.cookieService.set(this.cookieName, "true");
    this.clearTimeout();
    this.trigger = false;
    // console.log("accepted");
  }
}
