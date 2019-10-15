import { Component, OnInit } from "@angular/core";
import { PageService } from "../page.service";

@Component({
  selector: "app-garldru-footer",
  templateUrl: "./garldru-footer.component.html",
  styleUrls: ["./garldru-footer.component.scss"]
})
export class GarldruFooterComponent implements OnInit {
  constructor(private service: PageService) {}

  visible = false;

  menuItems = [];
  style: any = {};

  ngOnInit() {
    this.service.done.subscribe(res => {
      // console.log(res["common_json"]);
      this.menuItems = this.service.getBottomMenu();
      // this.style = this.service.getBottomStyle();
      // console.log(this.style)
      // console.log(this.menuItems);
    });
  }

  toggleFooter() {
    this.visible = !this.visible;
  }
}
