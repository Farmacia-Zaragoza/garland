import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewEncapsulation
} from "@angular/core";

@Component({
  selector: "brqx-text",
  templateUrl: "./brqx-text.component.html",
  styleUrls: ["./brqx-text.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class BrqxTextComponent implements OnInit {
  // input = "$: S [- Upd_line [X_001]: Upd_181115 - V_0.0.1 -]";
  @Input("content") input: string;
  type: any;
  content: string;
  href: string;

  types = {
    heading: {
      class: "stfc_regex_H",
      expression: /^\$:H\[([^]+)\]/g
    },
    subHeader: {
      class: "stfc_regex_S",
      expression: /^\$:S\[([^]+)\]/g
    },
    paragraph: {
      class: "stfc_regex_P",
      expression: /^\$:P\[([^]+)\]/g
    },
    versionTitle: {
      class: "stfc_version",
      expression: /^\$:V\[([^]+)\]/g
    }
  };
  html: any = "";

  matchResult: string[];

  constructor() {}

  ngOnChanges() {
    this.getType();
  }

  ngOnInit() {}

  private getType() {
    this.genLinks();

    Object.keys(this.types).forEach(key => {
      if (this.matchResult) return;
      this.matchResult = this.types[key].expression.exec(this.content);

      if (this.matchResult) {
        this.type = key;
        this.content = this.matchResult[1];
      }
    });
  }

  private genLinks() {
    const expression = /\$:L\[([^@]+)@([^\]]+)\]/g;
    let groups;
    while ((groups = expression.exec(this.input))) {
      this.input = this.input.replace(
        groups[0],
        `<a class="stfc_link" href="${groups[1]}">${groups[2]}</a>`
      );
    }
    this.content = this.input;
  }
}
