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
  sectionStyles: any;
  type: string = null;
  logo: any;
  langs: {};
  activeLang = null;
  visible = true;
  bgImage = {};

  ngOnInit() {
    this.service.done.subscribe(data => {
      const top = this.service.getTop();
      // console.log(top);
      this.sectionStyles = top.styles;
      this.type = this.sectionStyles.type;
      this.topBgImage();

      this.langs = top.langs;
      this.activeLang = this.langs[0];
      // delete this.langs[0];
      this.logo = this.service.getSiteLogo();

      console.log(top);
    });
  }

  topBgImage() {
    if (this.type !== "randomgallery") {
      this.bgImage = {
        backgroundImage: `url(${this.server +
          this.sectionStyles.pull03.bgimage.img})`
      };
    } else {
      let randImg = this.sectionStyles.pull03[
        Math.floor(Math.random() * this.sectionStyles.pull03.length)
      ];
      this.bgImage = {
        backgroundImage: `url(${this.server + randImg.img})`
      };
    }
  }

  randomgalleryImage() {
    if (!this.sectionStyles) return {};
    return {};
  }
}
