import { SliderService } from "./../slider.service";
import {
  Component,
  OnInit,
  Input,
  HostListener,
  ViewChild,
  ElementRef,
  DoCheck
} from "@angular/core";
import { Subscription, BehaviorSubject, fromEvent } from "rxjs";
import { map } from "rxjs/operators";
declare var $: any;

@Component({
  selector: "horizontal-slider",
  templateUrl: "./horizontal-slider.component.html",
  styleUrls: ["./horizontal-slider.component.scss"]
})
export class HorizontalSliderComponent implements OnInit {
  constructor(public sliderService: SliderService) {}

  @Input("duration") speed = 5;
  sliderContainer;
  remLength;
  scrollable;

  @ViewChild("sliderContainer") scrollerContainer: ElementRef;

  private subscription: Subscription;
  currentScrollLeft = new BehaviorSubject(0);
  scrollableWidth = new BehaviorSubject(1);

  // controlsVisible = true;

  // @HostListener("window:resize", ["$event"])
  // onResize(event) {
  //   // this.checkControlsVisibility();
  // }

  // @ViewChild("sliderContainer") container: ElementRef;

  ngOnInit() {
    // if (
    //   this.container.nativeElement.scrollWidth ===
    //   this.container.nativeElement.clientWidth
    // )
    //   this.controlsVisible = false;
    // console.log(this.controlsVisible);
  }

  ngAfterViewInit() {
    // this.checkControlsVisibility();
    const element = this.scrollerContainer.nativeElement;
    const scroll$ = fromEvent(element, "scroll").pipe(map(() => element));
    // console.log(scrollWidth, objWidth);

    // const obj = $(this.scrollerContainer.nativeElement);

    this.subscription = scroll$.subscribe(element => {
      const obj = $(element);
      const scrollable =
        $(element)[0].scrollWidth -
        $(element).width() -
        $(element).scrollLeft();

      this.scrollableWidth.next(scrollable < 1 ? 0 : scrollable);

      this.currentScrollLeft.next($(element).scrollLeft());
    });
  }

  // checkControlsVisibility() {
  //   // const orig = this.controlsVisible;
  //   if (
  //     this.container.nativeElement.scrollWidth ===
  //     this.container.nativeElement.clientWidth
  //   )
  //     this.controlsVisible = false;
  //   else this.controlsVisible = true;

  //   // orig === this.controlsVisible ? this.ngDoCheck() : "";

  //   // console.log(this.controlsVisible);
  // }

  // ngDoCheck() {}

  slideLeft({ currentTarget }) {
    let btn = currentTarget;
    this.sliderContainer = $(btn).siblings(".sliderContainer");
    this.remLength =
      $(this.sliderContainer)[0].scrollWidth - $(this.sliderContainer).width();
    this.scrollable = this.remLength - $(this.sliderContainer).scrollLeft();

    $(this.sliderContainer).animate(
      {
        scrollLeft: this.remLength
      },
      this.speed * this.scrollable
    );
  }

  slideToLeft({ currentTarget }) {
    let btn = currentTarget;
    this.sliderContainer = $(btn).siblings(".sliderContainer");
    this.remLength =
      $(this.sliderContainer)[0].scrollWidth - $(this.sliderContainer).width();
    this.scrollable = this.remLength - $(this.sliderContainer).scrollLeft();

    $(this.sliderContainer).animate(
      {
        scrollLeft: this.remLength
      },
      1000
    );
  }

  // slideLeft({ currentTarget }) {
  //   this.sliderContainer = this.container.nativeElement;
  //   this.remLength =
  //     this.sliderContainer.scrollWidth - this.sliderContainer.clientWidth;
  //   this.scrollable = this.remLength - this.sliderContainer.scrollLeft;

  //   $(this.sliderContainer).animate(
  //     {
  //       scrollLeft: this.remLength
  //     },
  //     this.speed * this.scrollable
  //   );
  // }

  // slideRight({ currentTarget }) {
  //   this.sliderContainer = this.container.nativeElement;

  //   $(this.sliderContainer).animate(
  //     {
  //       scrollLeft: 0
  //     },
  //     this.speed * this.sliderContainer.scrollLeft
  //   );
  // }

  slideRight({ currentTarget }) {
    let btn = currentTarget;
    this.sliderContainer = $(btn).siblings(".sliderContainer");

    $(this.sliderContainer).animate(
      {
        scrollLeft: 0
      },
      this.speed * $(this.sliderContainer).scrollLeft()
    );
  }

  slideToRight({ currentTarget }) {
    let btn = currentTarget;
    this.sliderContainer = $(btn).siblings(".sliderContainer");

    $(this.sliderContainer).animate(
      {
        scrollLeft: 0
      },
      1000
    );
  }

  slideStop({ currentTarget }) {
    let btn = currentTarget;
    $(btn)
      .siblings(".sliderContainer")
      .stop(true);
  }
}
