import { PageService } from "./../page.service";
import { SliderService } from "./../global/slider.service";
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
  constructor(public sService: SliderService, private service: PageService) {}
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
  config = {};

  ngOnInit() {
    this.service.done.subscribe(res => {
      // console.log(res["common_json"]);
      this.menuItems = res["common_json"]["bottom"];
      this.config = res["common_json"]["main"].filter(
        (items: any) => items.name === "footer"
      )[0];
      console.log(this.menuItems);
    });
  }

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
