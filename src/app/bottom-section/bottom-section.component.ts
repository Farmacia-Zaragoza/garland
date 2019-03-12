import { Component, OnInit } from "@angular/core";
import {
  slideRight,
  slideLeft,
  slideStop
} from "../global/global-jquery-methods";

@Component({
  selector: "app-bottom-section",
  templateUrl: "./bottom-section.component.html",
  styleUrls: ["./bottom-section.component.scss"]
})
export class BottomSectionComponent implements OnInit {
  constructor() {}
  visible = false;

  menuItems = [
    { link: "#", item: "item1" },
    { link: "#", item: "item2" },
    { link: "#", item: "item3" },
    { link: "#", item: "item4" },
    { link: "#", item: "item5" },
    { link: "#", item: "item6" },
    { link: "#", item: "item7" },
    { link: "#", item: "item8" },
    { link: "#", item: "item9" },
    { link: "#", item: "item10" },
    { link: "#", item: "item11" }
  ];

  ngOnInit() {}

  toggleFooter() {
    this.visible = !this.visible;
  }

  slideLeft({ currentTarget }) {
    // console.log(currentTarget);
    slideLeft(currentTarget);
  }

  slideRight({ currentTarget }) {
    // console.log(currentTarget);
    slideRight(currentTarget);
  }

  slideStop({ currentTarget }) {
    slideStop(currentTarget);
  }
}
