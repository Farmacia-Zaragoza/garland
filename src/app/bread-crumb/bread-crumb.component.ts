import { Component, OnInit } from "@angular/core";
import {
  slideInDownOnEnterAnimation,
  slideOutUpOnLeaveAnimation
} from "angular-animations";
@Component({
  selector: "app-bread-crumb",
  templateUrl: "./bread-crumb.component.html",
  styleUrls: ["./bread-crumb.component.scss"],
  animations: [
    slideInDownOnEnterAnimation({ duration: 500 }),
    slideOutUpOnLeaveAnimation({ duration: 500 })
  ]
})
export class BreadCrumbComponent implements OnInit {
  constructor() {}
  visible = false;

  ngOnInit() {}
}
