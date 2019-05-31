import { Component, OnInit } from "@angular/core";
import { PageService } from "../page.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainComponent implements OnInit {
  constructor(private service: PageService) {}

  paragraphs: Array<{}> = [];

  ngOnInit() {
    this.service.done.subscribe(data => {
      this.paragraphs = data.content.parragraphs.pull02;
    });
  }
}
