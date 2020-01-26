import { PageService } from "./../page.service";
import { Component, OnInit } from "@angular/core";

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
  constructor(private service: PageService) {}

  trigger = false;
  delay = 1000;

  ngOnInit() {
    this.service.done.subscribe(() => {
      setTimeout(() => {
        this.trigger = true;
      }, this.delay);
    });
  }

  denied() {
    this.trigger = false;
    console.log("denied");
  }

  accepted() {
    this.trigger = false;
    console.log("accepted");
  }
}
