import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";

@Component({
  selector: "marquee-text",
  templateUrl: "./marquee-text.component.html",
  styleUrls: ["./marquee-text.component.scss"]
})
export class MarqueeTextComponent implements OnInit, AfterViewInit {
  @ViewChild("responsiveText") responsiveText: ElementRef;
  @ViewChild("sliderItem") sliderItem: ElementRef;
  constructor() {}
  overflowing: Boolean = false;
  slider: Boolean = false;

  ngOnInit() {}

  ngAfterViewInit() {
    const scrollWidth = this.responsiveText.nativeElement.scrollWidth;
    const width = this.responsiveText.nativeElement.offsetWidth;
    // console.log(this.responsiveText);
    // console.log(scrollWidth, width);
    this.overflowing = scrollWidth !== width;

    if (this.overflowing) {
      this.sliderItem.nativeElement.innerHTML = this.responsiveText.nativeElement.innerHTML;
    }
  }

  showSlider() {
    if (this.overflowing) this.slider = true;
  }

  hideSlider() {
    if (this.overflowing) this.slider = false;
  }
}
