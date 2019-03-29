import { PageService } from "./../page.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-top-header",
  templateUrl: "./top-header.component.html",
  styleUrls: ["./top-header.component.scss"]
})
export class TopHeaderComponent implements OnInit {
  constructor(private service: PageService) {}

  config: any;
  logo: any;

  ngOnInit() {
    this.service.done.subscribe(data => {
      this.config = data.common_json.main.filter(
        item => item.name === "top"
      )[0];
      this.logo = data.common_json.main.filter(item => item.name === "logo")[0];
      console.log(this.logo);
    });
  }
}
