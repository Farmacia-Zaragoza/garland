import { Component, OnInit } from "@angular/core";
declare var $: any;
@Component({
  selector: "app-right-section",
  templateUrl: "./right-section.component.html",
  styleUrls: ["./right-section.component.scss"]
})
export class RightSectionComponent implements OnInit {
  constructor() {}
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

  ngOnInit() {}

  toggleInnerMenu({ target }) {
    const left = $(target).width();
    $(target)
      .children(".left-inner-menu")
      // .css({ top: $(target).position().top + "px", left: $(target).width +"calc(100% - 52px)" });
      .css({ top: $(target).position().top + 5 + "px", right: left + "px" });
  }
}
