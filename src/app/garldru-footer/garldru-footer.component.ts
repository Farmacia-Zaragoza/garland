import { Component, OnInit, Inject } from "@angular/core";
import { PageService } from "../page.service";

@Component({
  selector: "app-garldru-footer",
  templateUrl: "./garldru-footer.component.html",
  styleUrls: ["./garldru-footer.component.scss"]
})
export class GarldruFooterComponent implements OnInit {
  constructor(
    private service: PageService,
    @Inject("AppData") public AppData
  ) {}

  visible = false;

  menuItems = [];
  style: any = {};

  ngOnInit() {
    this.service.done.subscribe(res => {
      // console.log(res["common_json"]);
      // this.menuItems = this.service.getBottomMenu();
      // this.style = this.service.getBottomStyle();
      // console.log(this.style)
      try {
        const metaTagString = this.service.allData.content.articles[0].pull02
          .metatags.value;
        // console.log(metaTagString);
        this.menuItems = this.mapMetaTags(metaTagString || "");
      } catch (err) {
        console.log(err);
      }

      // console.log(this.menuItems);
    });
  }

  mapMetaTags(string: string) {
    return string.split(" ").map(item => {
      const clink = `/${this.AppData.lang || "en"}/search/${item}`;

      return { name: item, clink };
    });
  }

  toggleFooter() {
    this.visible = !this.visible;
  }
}
