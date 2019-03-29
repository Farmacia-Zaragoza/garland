import { Component, OnInit, Input } from "@angular/core";
import { PageService } from "../page.service";
declare var $: any;
@Component({
  selector: "app-right-section",
  templateUrl: "./right-section.component.html",
  styleUrls: ["./right-section.component.scss"]
})
export class RightSectionComponent implements OnInit {
  // toggleInnerMenu({ target }) {
  //   const left = $(target).width();
  //   $(target)
  //     .children(".left-inner-menu")
  //     // .css({ top: $(target).position().top + "px", left: $(target).width +"calc(100% - 52px)" });
  //     .css({ top: $(target).position().top + 5 + "px", right: left + "px" });
  // }

  constructor(public service: PageService) {}

  mainItems = [];
  @Input("config") config: any = {};

  pinned = false;

  ngOnInit() {
    this.service.done.subscribe(data => {
      this.mainItems = data["common_json"]["right"];
    });
  }

  showInnerMenu({ target }) {
    if (this.pinned) return;
    const left = $(target).width();
    $(target)
      .children(".left-inner-menu")
      .css({
        display: "block",
        top: $(target).position().top + 5 + "px",
        right: left + "px"
      });
  }
  hideInnerMenu({ target }) {
    if (this.pinned) return;
    $(target)
      .children(".left-inner-menu")
      .css({
        display: "none"
      });
  }

  toggleSticky() {
    this.pinned = !this.pinned;
    // alert(this.pinned);
  }
}
