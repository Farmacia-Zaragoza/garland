import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-top-section",
  templateUrl: "./top-section.component.html",
  styleUrls: ["./top-section.component.scss"]
})
export class TopSectionComponent implements OnInit {
  styles = {
    "background-color": "#000",
    "background-image":
      "url(http://cica.dbrqx.com/rimg/cica/images/brqx_hozdepriegotajoosa_0512x0192.png)"
  };

  constructor() {}

  ngOnInit() {}
}
