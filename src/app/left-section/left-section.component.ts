import { PageService } from "./../page.service";
import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChildren,
  QueryList,
  HostListener
} from "@angular/core";
declare var $: any;

@Component({
  selector: "app-left-section",
  templateUrl: "./left-section.component.html",
  styleUrls: ["./left-section.component.scss"]
})
export class LeftSectionComponent implements OnInit, AfterViewInit {
  constructor(public service: PageService) {}

  customOptions: any = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      }
    }
  };

  hidden = true;

  mainItems = {};
  @Input("config") config: any = {};
  // @ViewChildren("owlCar") oneItems: QueryList<any>;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.hidden = false;
  }

  pinned = false;

  ngOnInit() {
    this.service.done.subscribe(data => {
      // this.mainItems = data["common_json"]["left"];
      const left = this.service.getLeft();
      this.mainItems = left.menus;
      // this.config = left.styles;

      // this.config.value = ""; // quick fix

      // console.log(this.mainItems);
    });
  }

  ngAfterViewInit() {
    // console.log(this.config);
    // this.oneItems.changes.subscribe(t => {
    //   // console.log("working view children");
    //   // this.initOneSlider();
    //   // this.hidden = false;
    //   this.hidden = true;
    // });
  }

  initializedDone() {
    console.log("working.. done");
  }

  showInnerMenu({ target }) {
    if (this.pinned) return;
    const left = $(target).width() + $(target).position().left;
    $(target)
      .children(".left-inner-menu")
      .css({
        visibility: "visible",
        top: $(target).position().top + 5 + "px",
        left: left + "px"
      });
  }
  hideInnerMenu({ target }) {
    if (this.pinned) return;
    $(target)
      .children(".left-inner-menu")
      .css({
        visibility: "hidden"
      });
  }

  toggleSticky() {
    this.pinned = !this.pinned;
  }

  initOneSlider() {
    $(".oneItems").slick({
      prevArrow: `<i class="fa fa-angle-left"></i>`,
      nextArrow: `<i class="fa fa-angle-right"></i>`,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true
    });
  }
}
