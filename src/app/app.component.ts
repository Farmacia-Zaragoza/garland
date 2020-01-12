import { PageService } from "./page.service";
import { Component, OnInit } from "@angular/core";
import {
  bounceInRightAnimation,
  bounceInLeftAnimation,
  bounceOutRightAnimation,
  bounceOutLeftAnimation,
  fadeInRightAnimation,
  fadeOutRightAnimation,
  fadeInLeftAnimation,
  fadeOutLeftAnimation
} from "angular-animations";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [
    bounceInRightAnimation(),
    bounceOutRightAnimation(),
    bounceInLeftAnimation(),
    bounceOutLeftAnimation()
  ]
})
export class AppComponent implements OnInit {
  constructor(public service: PageService) {}

  left = null;

  right = null;

  leftVisible = false;
  rightVisible = false;

  ngOnInit() {
    this.service.done.subscribe(data => {
      this.left = this.service.getLeft();

      this.right = this.service.getRight();

      // console.log(this.left);
      // console.log(this.right.styles.menutype);
    });
  }
}
