import { environment } from "./../../environments/environment";
import { PageService } from "./../page.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "brqx-photo",
  templateUrl: "./photo.component.html",
  styleUrls: ["./photo.component.scss"]
})
export class PhotoComponent implements OnInit {
  constructor(private service: PageService) {
    this.server = environment.server;
  }
  photos;
  breakpoints;
  server;
  view = "grid";

  ngOnInit() {
    this.service.done.subscribe(data => {
      this.photos = this.service.photos;
      console.log(this.photos);

      // this.breakpoints = this.service.getBreakPoints();
    });
  }

  changeView() {
    this.view = this.view === "grid" ? "list" : "grid";
  }
}
