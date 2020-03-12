import { Input, Directive, ElementRef } from "@angular/core";
declare const $;

@Directive({
  selector: "[MultiResolution]"
})
export class MultiResolutionDirective {
  @Input("MultiResolution") breakPoints: any;
  @Input("src") origSrc: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.src = changeUrl(this.breakPoints, this.origSrc);
  }

  // static maxResUrl(genBreakPoints: {}, origSrc: string) {

  // }
}

export const changeUrl = (breakPoints: {}, url: string) => {
  const deviceWidth = window.innerWidth;

  const points = Object.keys(breakPoints);

  //descending order
  points.sort((a: any, b: any) => b - a);
  // console.log(points);

  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    if (Number(point) <= deviceWidth) {
      // console.log(point);
      return url.replace(/RESOLUTION/g, breakPoints[point]);
    }
  }
};

export const genBreakPoints = (
  sizes,
  points = { 1171: "", 769: "", 501: "", 220: "" }
) => {
  const breakpoints = { ...points };
  Object.keys(points).forEach((k, i) => {
    breakpoints[k] = sizes[i];
  });
  return breakpoints;
};
