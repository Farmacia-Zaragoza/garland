import { HorizontalSliderComponent } from "./../global/horizontal-slider/horizontal-slider.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { PageService } from "../page.service";

@Component({
  selector: "app-top-section",
  templateUrl: "./top-section.component.html",
  styleUrls: ["./top-section.component.scss"]
})
export class TopSectionComponent implements OnInit {
  styles = {
    "background-color": "#000"
    // "background-image":
    //   "url(http://cica.dbrqx.com/rimg/cica/images/brqx_hozdepriegotajoosa_0512x0192.png)"
  };

  menuItems = [];
  activeItem;
  @ViewChild(HorizontalSliderComponent) slider: HorizontalSliderComponent;

  constructor(private service: PageService) {}

  ngOnInit() {
    this.service.done.subscribe(res => {
      // console.log(res["common_json"]);
      // this.menuItems = res["common_json"]["top"];
      // this.topConfig = res["common_json"]["main"].filter(
      //   (items: any) => items.name === "top"
      // )[0];
      // console.log(this.topConfig)
      this.menuItems = this.service.getHeader();
      // console.log(header);
      // console.log(this.menuItems);
      this.activeItem = this.service.cLink;
      // this.activeItem = "en/article/a00";
      // this.activeItem = "en/article/a16";
      // this.activeItem = "en/article/a37";

      // console.log(this.activeItem, this.menuItems);

      setTimeout(() => {
        this.slider.slideToActive();
      }, 1000);
    });
  }
}
