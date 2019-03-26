import { Component, OnInit } from "@angular/core";
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
  topConfig = {
    bgcolor: "ECE3E9",
    clink: "taxonomy/top",
    index: "003",
    name: "top",
    type: "menu",
    value: ""
  };

  constructor(private service: PageService) {}

  ngOnInit() {
    this.service.done.subscribe(res => {
      // console.log(res["common_json"]);
      this.menuItems = res["common_json"]["top"];
      this.topConfig = res["common_json"]["main"].filter(
        (items: any) => items.name === "top"
      )[0];
      // console.log(this.topConfig)
    });
  }
}
