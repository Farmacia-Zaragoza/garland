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
  constructor(private service: PageService) {}

  configs = [];
  leftStyle = {
    bgcolor: { value: "fff" },
    menuType: { value: "many" }
  };
  rightStyle = { value: "fff" };

  leftVisible = false;
  rightVisible = false;

  ngOnInit() {
    this.service.done.subscribe(data => {
      this.leftStyle = this.service.getLeft().styles;

      this.rightStyle = this.service.getRight().styles;
    });
  }

  leftConfig() {
    return this.configs.filter(config => config.name === "left")[0];
  }

  rightConfig() {
    return this.configs.filter(config => config.name === "right")[0];
  }
}
