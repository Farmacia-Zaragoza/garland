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
  //input as a props
  @Input("content") input: string;
  type: any;
  content: string;
  href: string;
  anchorId: string;

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

  constructor() {
    const prtocol = window.location.protocol;
    // console.log(prtocol);
  }

  ngOnChanges() {
    //runs whenever this component have any change to apply. kind of same as the render method in #React
    this.content = this.input;
    this.getType();
  }

  ngOnInit() {}

  private getType() {
    this.genLinks();

    Object.keys(this.types).forEach(key => {
      if (this.matchResult) return;

      this.matchResult = this.types[key].expression.exec(this.content);
      if (this.matchResult) {
        // console.log(this.matchResult);
        this.type = key;
        this.content = this.matchResult[1];
      }
    });

    switch (this.type) {
      case "versionTitle":
        break;

      default:
        this.getAnchorId();
        break;
    }
  }

  private genLinks() {
    const expression = /\$:L\[([^@]+)@([^\]]+)\]/g;
    // Matching and replacing with a anchor tag
    let groups;
    while ((groups = expression.exec(this.content))) {
      this.content = this.content.replace(
        groups[0],
        `<a class="stfc_link" href="${this.fixProtocol(groups[1])}">${
          groups[2]
        }</a>`
      );
    }
  }

  private fixProtocol(link: string): string {
    if (!link.includes("http")) {
      // link could be just an hash value. ex: '#logical_info
      return window.location.protocol + "//" + link;
    }
    return link;
  }

  private getAnchorId() {
    // Matching and replacing the Id with an empty string, extracting the id as well.
    const expression = /\#([^(?!\"\>)]+)$/g;
    const result = expression.exec(this.content);
    // console.log(this.content);

    if (result) {
      // console.log(result);
      this.anchorId = result[1];
      this.content = this.content.replace(`#${this.anchorId}`, "");
      console.log(this.anchorId);
    }
  }
}
