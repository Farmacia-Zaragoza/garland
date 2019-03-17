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

  slideStop({ currentTarget }) {
    let btn = currentTarget;
    $(btn)
      .siblings(".sliderContainer")
      .stop(true);
  }
}
