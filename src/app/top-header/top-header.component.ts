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
  diamondLangs: [];
  activeLang = null;
  visible = true;
  bgImage = [];

  title = "";
  subtitle = "";

  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: false,
    autoplayTimeout: 8000,
    autoplaySpeed: 1500,
    responsive: {
      0: {
        items: 1
      }
    }
  };

  ngOnInit() {
    this.service.done.subscribe(data => {
      const top = this.service.getTop();
      // console.log(top);
      this.sectionStyles = top.styles;
      this.type = this.sectionStyles.type;
      this.topBgImage();

      this.langs = top.langs;
      this.activeLang = this.langs[0];

      this.diamondLangs = this.service.diamondFlags;
      // delete this.langs[0];
      this.logo = this.service.siteLogo;
      console.log(this.logo);
      this.title = this.service.getSiteTitle();
      this.subtitle = this.service.getSiteSubtitle();

      // console.log(top);
    });
  }

  topBgImage() {
    if (this.type === "randomgallery") {
      let randImg = this.sectionStyles.pull03[
        Math.floor(Math.random() * this.sectionStyles.pull03.length)
      ];
      randImg.img = this.server + randImg.img;
      this.bgImage.push(randImg);
      // this.bgImage = this.sectionStyles.pull03.map(item => {
      //   item.img = this.server + item.img;
      //   return item;
      // });
    } else if (this.type === "slide") {
      this.bgImage = this.sectionStyles.pull03.map(item => {
        item.img = this.server + item.img;
        return item;
      });
      this.customOptions.autoplay = true;
      // console.log(this.bgImage);
    } else {
      const imgObj = this.sectionStyles.pull03.bgimage;
      imgObj.img = this.server + imgObj.img;
      this.bgImage.push(imgObj);
    }
    // console.log(this.bgImage);
  }

  randomgalleryImage() {
    if (!this.sectionStyles) return {};
    return {};
  }
}
