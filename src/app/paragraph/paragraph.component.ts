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
declare var $: any;

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
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
export class ParagraphComponent implements OnInit {

  constructor(private service: PageService, private _lightbox: Lightbox) {}

  @ViewChild("socialInnerContainer") socialInnerContainer: ElementRef;
  @ViewChildren("socialInnerContainer") containerRef: QueryList<any>;
  paragraphs: Array<{}> = [];
  type: string;
  image: string;
  animate = false;
  _album = [];
  siteThemeColors = {
    stfc_link_default_color_: {
      index: "000v001v002v002v002",
      type: "item",
      value: "78348E"
    },
    stfc_link_hover_color: {
      index: "000v001v002v002v003",
      type: "item",
      value: "99995B"
    },
    stfc_text_even_color_: {
      index: "000v001v002v002v000",
      type: "item",
      value: "78348E"
    },
    stfc_text_odd_color: {
      index: "000v001v002v002v001",
      type: "item",
      value: "9C7F24"
    }
  };

  breakPoints: any = {
    1171: "0900x1200",
    769: "0750x0960",
    501: "0600x0710",
    220: "0480x0600"
  };

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
      console.log(this._album);
    });
  }

  ngAfterViewInit() {
    this.containerRef.changes.subscribe(t => {
      this.getPos();
    });
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index);
  }

  obj: any;
  // mouse movement exucution start here .when mouse hover over 10% top or 10% bottom then scroll up/down start
  top = 0;
  left = 0;
  bottom = 0;
  right = 0;
  excldH = 0;
  objHeight = 0;
  objWidth = 0;
  disableAutoScroll = true;

  onImageLoad() {
    console.log("loaded");
    this.animate = true;
  }

  //Get position of mouse pointer
  handleMouseMove(e) {
    const posY = e.clientY;
    if (posY < this.top + this.excldH && this.disableAutoScroll == true) {
      this.verticalSlideDown();
      // console.log("down");
    } else if (
      posY > this.bottom - this.excldH &&
      this.disableAutoScroll == true
    ) {
      this.verticalSlideUp();
      // console.log("up");
    } else {
      // console.log("stop");
      var div = $(this.obj);
      div.stop();
    }
  }
  // Get position of the div 'scroll-inner-container'
  getPos() {
    this.obj = $(this.socialInnerContainer.nativeElement);
    var offsets = this.obj.offset();
    this.objHeight = this.socialInnerContainer.nativeElement.clientHeight;
    this.objWidth = this.socialInnerContainer.nativeElement.clientWidth;
    this.excldH = this.objHeight / 3; //Caculating 10% height
    this.top = offsets.top;
    this.left = offsets.left;
    this.bottom = this.top + this.objHeight;
    this.right = this.left + this.objWidth;
    // console.log(this.socialInnerContainer);
  }

  verticalSlideUp() {
    var div = $(this.obj);
    div.stop();
    var remHeight =
      this.socialInnerContainer.nativeElement.scrollHeight - this.objHeight;
    var scrollableHeight = remHeight - div.scrollTop();
    var pos = div.scrollTop();
    var remainingTime = ((remHeight - pos) * 100) / 5; //here 5 is a speed
    // console.log("pos : "+ pos);
    div.animate(
      {
        scrollTop: remHeight
      },
      {
        duration: remainingTime,
        easing: "linear"
      }
    );
  }
  verticalSlideDown() {
    var div = $(this.obj);
    div.stop();
    var remHeight =
      this.socialInnerContainer.nativeElement.scrollHeight - this.objHeight;
    var scrollableHeight = remHeight - div.scrollTop();
    var pos = div.scrollTop();
    // console.log("pos : "+ pos);
    var remainingTime = (pos * 100) / 5; //here 5 is a speed
    div.animate(
      {
        scrollTop: 0
      },
      {
        duration: remainingTime,
        easing: "linear"
      }
    );
  }

}
