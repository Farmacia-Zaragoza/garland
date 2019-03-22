import { PageService } from "./../page.service";
import { Component, OnInit } from "@angular/core";
declare var $: any;

@Component({
  selector: "app-left-section",
  templateUrl: "./left-section.component.html",
  styleUrls: ["./left-section.component.scss"]
})
export class LeftSectionComponent implements OnInit {
  constructor(public service: PageService) {}

  mainItems = [
    { name: "item 1" },
    { name: "item 2" },
    { name: "item 3" },
    { name: "item 4" },
    { name: "item 5" },
    { name: "item 6" },
    { name: "item 7" },
    { name: "item 7" },
    { name: "item 7" },
    { name: "item 7" },
    { name: "item 7" },
    { name: "item 7" },
    { name: "item 7" },
    { name: "item 7" },
    { name: "item 7" }
  ];

  pinned = false;

  ngOnInit() {
    this.service.done.subscribe(data => {
      this.mainItems = data["common_json"]["left"];
      // console.log(this.mainItems);
    });
  }

  showInnerMenu({ target }) {
    if (this.pinned) return;
    const left = $(target).width() + $(target).position().left;
    $(target)
      .children(".left-inner-menu")
      .css({
        display: "block",
        top: $(target).position().top + 5 + "px",
        left: left + "px"
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
