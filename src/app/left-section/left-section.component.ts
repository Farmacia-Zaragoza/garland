import { SliderService } from "./../global/slider.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-left-section",
  templateUrl: "./left-section.component.html",
  styleUrls: ["./left-section.component.scss"]
})
export class LeftSectionComponent implements OnInit {
  constructor(public sService: SliderService) {}

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
}
