import { changeUrl } from "./../directives/multi-resolution.directive";
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList
} from "@angular/core";
import { PageService } from "../page.service";
import { environment } from "./../../environments/environment";
import {
  trigger,
  state,
  style,
  animate,
  transition
  // ...
} from "@angular/animations";
import { Lightbox } from "ngx-lightbox";
import { ActivatedRoute } from "@angular/router";
import { AutoScrollComponent } from "../global/auto-scroll/auto-scroll.component";
declare var $: any;

@Component({
  selector: "app-paragraph",
  templateUrl: "./paragraph.component.html",
  styleUrls: ["./paragraph.component.scss"],
  animations: [
    trigger("zoomFadeIn", [
      state(
        "hidden",
        style({
          transform: "scale(1.5)",
          opacity: 0
        })
      ),

      transition("hidden => *", [animate("1s ease-in")])
    ])
  ]
})
export class ParagraphComponent implements OnInit, AfterViewInit {
  constructor(private service: PageService, private _lightbox: Lightbox) {}

  paragraphs: Array<{}> = [];
  type: string;
  image: string;
  animate = false;
  _album = [];

  breakPoints: any = {
    1171: "0900x1200",
    769: "0750x0960",
    501: "0600x0710",
    220: "0480x0600"
  };

  @ViewChild(AutoScrollComponent) autoScroller: AutoScrollComponent;

  ngOnInit() {
    this.service.done.subscribe(data => {
      // this.siteThemeColors = this.service.getFontColor();
      // console.log(this.siteThemeColors);
      this.paragraphs = data.content.articles[0].pull02.parragraph.pull03;

      this.type = data.content.articles[0].pull02.parragraph.type;
      if (this.type === "iparragraph") {
        this.breakPoints = this.service.getBreakPoints();

        this.image =
          environment.server + data.content.articles[0].pull02.image.img;
        // console.log(this.paragraphs);

        const src =
          environment.server + data.content.articles[0].pull02.image.img;
        const thumb =
          environment.server + data.content.articles[0].pull02.image.img;

        const item = {
          src: changeUrl(this.breakPoints, src),
          thumb: thumb
        };
        this._album.push(item);
      }
      // console.log(this.service.getBreakPoints());
      // console.log(this._album);

      // animate scroll feature for the first time page load
      setTimeout(() => {
        const hash = window.location.hash;
        if (hash) {
          this.autoScroller.goToTarget(hash);
        }
      }, 1000);
    });
  }

  ngAfterViewInit() {
    // console.log("view initialized...");
  }

  // ngAfterContentChecked() {
  //   console.log("changes happened..");
  // }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index);
  }

  onImageLoad() {
    console.log("loaded");
    this.animate = true;
  }
}
