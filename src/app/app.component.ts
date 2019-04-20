import { PageService } from "./page.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private service: PageService) {}

  configs = [];
  leftStyle = { value: "fff" };
  rightStyle = { value: "fff" };

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
    { link: "#", item: "item11" },
    { link: "#", item: "item11" },
    { link: "#", item: "item11" },
    { link: "#", item: "item11" },
    { link: "#", item: "item11" }
  ];

  ngOnInit() {
    this.service.done.subscribe(data => {
      this.leftStyle = this.service.getLeft().styles;

      this.rightStyle = this.service.getRight().styles;

      // console.log(this.leftStyle);
      // this.configs = data["common_json"]["main"];
      // console.log(this.rightConfig());
      // console.log(this.mainItems);
    });
  }

  leftConfig() {
    return this.configs.filter(config => config.name === "left")[0];
  }

  rightConfig() {
    return this.configs.filter(config => config.name === "right")[0];
  }
}
