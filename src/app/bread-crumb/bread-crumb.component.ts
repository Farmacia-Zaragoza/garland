import { PageService } from "./../page.service";
import { Component, OnInit, Inject, Input } from "@angular/core";
import {
  slideInDownOnEnterAnimation,
  slideOutUpOnLeaveAnimation
} from "angular-animations";
@Component({
  selector: "app-bread-crumb",
  templateUrl: "./bread-crumb.component.html",
  styleUrls: ["./bread-crumb.component.scss"],
  animations: [
    slideInDownOnEnterAnimation({ duration: 500 }),
    slideOutUpOnLeaveAnimation({ duration: 500 })
  ]
})
export class BreadCrumbComponent implements OnInit {
  constructor(
    private service: PageService,
    @Inject("AppData") public AppData
  ) {}
  visible = false;
  breadCrumbStr = "articles/a00";
  // /language/articles -> articles
  // /language/articles/a00 -> a00
  breadCrumbs = null;
  // @Input("path") path: string;

  ngOnInit() {
    this.service.done.subscribe(data => {
      // this.service.getTop
      try {
        if (this.AppData.page.type === "list") {
          this.breadCrumbStr = data.content.articles.sg_breadcrumb;
        } else {
          this.breadCrumbStr = data.content.articles[0].sg_breadcrumb;
        }
        this.mapBreadCrumbs();
      } catch (err) {
        console.log("BreadCrumb not found...", err);
      }
    });
  }

  mapBreadCrumbs() {
    this.breadCrumbs = this.breadCrumbStr.split("/").map((item, index) => {
      const link =
        `/${this.AppData.lang || "en"}/` +
        this.breadCrumbStr
          .split("/")
          .slice(0, index + 1)
          .join("/");
      return { name: item, link };
    });
    // console.log(this.breadCrumbs);
  }
}
