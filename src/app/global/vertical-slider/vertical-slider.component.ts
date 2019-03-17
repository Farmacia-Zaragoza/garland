import { Component, OnInit, Input } from "@angular/core";
declare var $: any;

@Component({
  selector: "vertical-slider",
  templateUrl: "./vertical-slider.component.html",
  styleUrls: ["./vertical-slider.component.scss"]
})
export class VerticalSliderComponent implements OnInit {
  constructor() {}

  @Input("duration") speed = 5;
  sliderContainer;
  remLength;
  scrollable;

  ngOnInit() {}

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
