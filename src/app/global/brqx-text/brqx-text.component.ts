import { Component, OnInit, Input, AfterViewInit } from "@angular/core";

@Component({
  selector: "brqx-text",
  templateUrl: "./brqx-text.component.html",
  styleUrls: ["./brqx-text.component.scss"]
})
export class BrqxTextComponent implements OnInit {
  // input = "$: S [- Upd_line [X_001]: Upd_181115 - V_0.0.1 -]";
  @Input("content") input: string;
  type: string | undefined;
  content: string;
  href: string;

  types = {
    heading: {
      class: "stfc_header",
      expression: /^\$:H\[([^]+)\]/g
    },
    subHeader: {
      class: "stfc_subheader",
      expression: /^\$:S\[([^]+)\]/g
    },
    link: {
      class: "stfc_link",
      expression: /^\$:L\[([^]+)@([^]+)\]/g
    },
    paragraph: {
      class: "stfc_parragraph",
      expression: /^\$:P\[([^]+)\]/g
    },
    versionTitle: {
      class: "stfc_version",
      expression: /^\$:V\[([^]+)\]/g
    }
  };

  matchResult;

  constructor() {}

  ngOnChanges() {
    this.getType();
  }

  ngOnInit() {}

  getType() {
    Object.keys(this.types).forEach(key => {
      if (this.matchResult) return;
      this.matchResult = this.types[key].expression.exec(this.input);

      if (this.matchResult) {
        this.type = key;

        if (key === "link") {
          this.href = this.matchResult[1];
          this.content = this.matchResult[2];
        } else {
          this.content = this.matchResult[1];
        }
      }
    });
  }
}
