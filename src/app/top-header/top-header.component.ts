import { Component, OnInit } from "@angular/core";
import { PageService } from "./../page.service";
import { environment } from "./../../environments/environment";
import { collapseAnimation } from "angular-animations";

@Component({
  selector: "app-top-header",
  templateUrl: "./top-header.component.html",
  styleUrls: ["./top-header.component.scss"],
  animations: [collapseAnimation()]
})
export class TopHeaderComponent implements OnInit {
  constructor(private service: PageService) {}
  server: string = environment.server;
  config: any;
  logo: any;
  langs: {};
  activeLang = null;
  visible = true;

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
      this.activeLang = this.langs[0];
      // delete this.langs[0];
      this.logo = this.service.getSiteLogo();

      console.log(this.activeLang);
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
