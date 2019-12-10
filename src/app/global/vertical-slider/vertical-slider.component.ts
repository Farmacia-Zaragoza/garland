import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import { fromEvent, Subscription, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
declare var $: any;

@Component({
  selector: "vertical-slider",
  templateUrl: "./vertical-slider.component.html",
  styleUrls: ["./vertical-slider.component.scss"]
})
export class VerticalSliderComponent implements OnInit, AfterViewInit {
  constructor() {}

  @Input("duration") speed = 5;
  sliderContainer;
  remLength;
  scrollable;

  @ViewChild("sliderContainer") scrollerContainer: ElementRef;

  private subscription: Subscription;
  currentScrollTop = new BehaviorSubject(0);
  scrollableHeight = new BehaviorSubject(1);

  ngOnInit() {}

  ngAfterViewInit() {
    const element = this.scrollerContainer.nativeElement;
    const scroll$ = fromEvent(element, "scroll").pipe(map(() => element));
    // console.log(scrollWidth, objWidth);

    // const obj = $(this.scrollerContainer.nativeElement);

    this.subscription = scroll$.subscribe(element => {
      const obj = $(element);
      const scrollable =
        $(element)[0].scrollHeight -
        $(element).height() -
        $(element).scrollTop();

      this.scrollableHeight.next(scrollable < 1 ? 0 : scrollable);

      this.currentScrollTop.next($(element).scrollTop());
    });
  }

  slideStop({ currentTarget }) {
    let btn = currentTarget;
    $(btn)
      .siblings(".sliderContainer")
      .stop(true);
  }

  slideDown({ currentTarget }) {
    let btn = currentTarget;
    this.sliderContainer = $(btn).siblings(".sliderContainer");
    this.remLength =
      $(this.sliderContainer)[0].scrollHeight -
      $(this.sliderContainer).height();
    this.scrollable = this.remLength - $(this.sliderContainer).scrollTop();

    $(this.sliderContainer).animate(
      {
        scrollTop: this.remLength
      },
      this.speed * this.scrollable
    );
  }

  slideUp({ currentTarget }) {
    let btn = currentTarget;
    this.sliderContainer = $(btn).siblings(".sliderContainer");

    $(this.sliderContainer).animate(
      {
        scrollTop: 0
      },
      this.speed * $(this.sliderContainer).scrollTop()
    );
  }
}
