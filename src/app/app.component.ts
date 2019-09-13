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

  leftStyle = {
    bgcolor: { value: "fff" },
    menuType: { value: "many" }
  };
  left = null;

  right = null;
  rightStyle = {
    bgcolor: { value: "fff" },
    menuType: { value: "many" }
  };

  leftVisible = false;
  rightVisible = false;

  ngOnInit() {
    this.service.done.subscribe(data => {
      this.left = this.service.getLeft();
      this.leftStyle = this.left.styles;

      this.right = this.service.getRight();
      this.rightStyle = this.right.styles;

      console.log(this.left)
      // console.log(this.right.styles.menutype);
    });
  }
}
