import { Injectable } from "@angular/core";
declare var $: any;

@Injectable({
  providedIn: "root"
})
export class SliderService {
  constructor() {}

  speed = 5;
  sliderContainer;
  remLength;
  scrollable;

  slideLeft(btn) {
    this.sliderContainer = $(btn).siblings(".this.sliderContainer");
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

  slideRight(btn) {
    this.sliderContainer = $(btn).siblings(".this.sliderContainer");

    $(this.sliderContainer).animate(
      {
        scrollLeft: 0
      },
      this.speed * $(this.sliderContainer).scrollLeft()
    );
  }

  slideDown(btn) {
    this.sliderContainer = $(btn).siblings(".this.sliderContainer");
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

  slideUp(btn) {
    this.sliderContainer = $(btn).siblings(".this.sliderContainer");

    $(this.sliderContainer).animate(
      {
        scrollTop: 0
      },
      this.speed * $(this.sliderContainer).scrollTop()
    );
  }

  slideStop(btn) {
    $(btn)
      .siblings(".this.sliderContainer")
      .stop();
  }
}
