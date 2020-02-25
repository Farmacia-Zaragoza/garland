import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList
} from "@angular/core";
import { fromEvent, Observable, of, BehaviorSubject, Subscription } from "rxjs";
import { map } from "rxjs/operators";
// import { of } from 'rxjs/observable/of';
// import 'rxjs/add/observable/of';

declare const $: any;
@Component({
  selector: "auto-scroll",
  templateUrl: "./auto-scroll.component.html",
  styleUrls: ["./auto-scroll.component.scss"]
})
export class AutoScrollComponent implements OnInit {
  constructor() {}

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

  @ViewChild("scrollerContainer") scrollerContainer: ElementRef;
  // @ViewChildren("scrollerContainer") containerRef: QueryList<any>;
  private subscription: Subscription;
  currentScrollTop = new BehaviorSubject(0);
  scrollableHeight = new BehaviorSubject(1);

  ngOnInit() {}

  ngAfterViewInit() {
    const element = this.scrollerContainer.nativeElement;
    const scroll$ = fromEvent(element, "scroll").pipe(map(() => element));

    this.subscription = scroll$.subscribe(element => {
      const scrollable =
        this.scrollerContainer.nativeElement.scrollHeight -
        this.objHeight -
        $(element).scrollTop();
      this.scrollableHeight.next(scrollable);

      this.currentScrollTop.next($(element).scrollTop());
    });

    this.getPos();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
      this.stop();
    }
  }

  stop() {
    this.obj = $(this.scrollerContainer.nativeElement);
    this.obj.stop();
  }

  getToTop() {
    this.obj = $(this.scrollerContainer.nativeElement);
    this.obj.animate(
      {
        scrollTop: 0
      },
      {
        duration: 1000,
        easing: "linear"
      }
    );
  }

  getToBottom() {
    this.obj = $(this.scrollerContainer.nativeElement);
    const remHeight =
      this.scrollerContainer.nativeElement.scrollHeight - this.objHeight;
    this.obj.animate(
      {
        scrollTop: remHeight
      },
      {
        duration: 1000,
        easing: "linear"
      }
    );
  }
  // Get position of the div 'scroll-inner-container'
  getPos() {
    this.obj = $(this.scrollerContainer.nativeElement);
    const offsets = this.obj.offset();
    this.objHeight = this.scrollerContainer.nativeElement.clientHeight;
    this.objWidth = this.scrollerContainer.nativeElement.clientWidth;
    this.excldH = this.objHeight / 3; //Caculating 10% height
    this.top = offsets.top;
    this.left = offsets.left;
    this.bottom = this.top + this.objHeight;
    this.right = this.left + this.objWidth;
  }

  verticalSlideUp() {
    const div = $(this.obj);
    div.stop();
    const remHeight =
      this.scrollerContainer.nativeElement.scrollHeight - this.objHeight;
    const scrollableHeight = remHeight - div.scrollTop();
    const pos = div.scrollTop();
    const remainingTime = ((remHeight - pos) * 100) / 5; //here 5 is a speed
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
    const div = $(this.obj);
    div.stop();
    const remHeight =
      this.scrollerContainer.nativeElement.scrollHeight - this.objHeight;
    const scrollableHeight = remHeight - div.scrollTop();
    const pos = div.scrollTop();
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

  goToTarget(target: string) {
    const element = $(target);
    if (!element[0]) return;

    const position = element.position();
    $(this.scrollerContainer.nativeElement).animate(
      { scrollTop: position.top },
      1000
    );
  }
}
