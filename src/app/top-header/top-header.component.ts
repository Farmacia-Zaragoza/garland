import { Component, OnInit } from "@angular/core";
import { PageService } from "./../page.service";
import { environment } from "./../../environments/environment";

@Component({
  selector: "app-top-header",
  templateUrl: "./top-header.component.html",
  styleUrls: ["./top-header.component.scss"]
})
export class TopHeaderComponent implements OnInit {
  constructor(private service: PageService) {}
  server: string = environment.server;
  config: any;
  logo: any;
  langs: {};

  ngOnInit() {
    this.service.done.subscribe(data => {
      // this.config = data.common_json.main.filter(
      //   item => item.name === "top"
      // )[0];
      // this.logo = data.common_json.main.filter(item => item.name === "logo")[0];
      // this.langs = data.common_json.langs;
      // console.log(this.langs);

      const top = this.service.getTop();
      // console.log(top);
      this.config = top.styles;
      this.langs = top.langs;
      this.logo = this.service.getSiteLogo();
    });
  }

  topBgUrl() {
    if (!this.config) return {};
    const style = {
      backgroundImage: `url(${this.server + this.config.img})`
    };
    return style;
  }
}
