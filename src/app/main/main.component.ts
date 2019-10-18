import { Component, OnInit, Inject } from "@angular/core";
declare var $: any;

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  constructor(@Inject("AppData") public AppData) {
    this.pageType = AppData.page.type;
  }

  public pageType = "front";

  ngOnInit() {}

  ngAfterViewInit() {}
}
