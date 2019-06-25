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
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
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
export class MainComponent implements OnInit, AfterViewInit {
  constructor(private service: PageService, private _lightbox: Lightbox) {}

  @ViewChild("socialInnerContainer") socialInnerContainer: ElementRef;
  @ViewChildren("socialInnerContainer") containerRef: QueryList<any>;
  private paragraphs: Array<{}> = [];
  private image: string;
  private animate = false;
  private _album = [];

  ngOnInit() {
    this.service.done.subscribe(data => {
      this.paragraphs = data.content.parragraphs.pull02;
      this.image = environment.server + data.content.image.img;
      console.log(this.image);

      const src = environment.server + data.content.image.img;
      const thumb = environment.server + data.content.image.img;
      const item = {
        src: src,
        thumb: thumb
      };

      this._album.push(item);
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
