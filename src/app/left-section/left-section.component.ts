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

  // hidden = true;

  @Input("data") mainItems = [];
  @Input("config") config: any;
  @Input("region") region: string = "left";
  // @ViewChildren("owlCar") oneItems: QueryList<any>;

  pinned = false;

  ngOnInit() {
    // this.service.done.subscribe(data => {
    //   this.mainItems = data["common_json"]["left"];
    //   const left = this.service.getLeft();
    //   this.mainItems = left.menus;
    //   this.config = left.styles.menutype;
    //   this.config.value = ""; // quick fix
    //   console.log(this.config);
    // });
  }

  ngAfterViewInit() {}

  initializedDone() {
    console.log("working.. done");
  }

  showInnerMenu({ target }) {
    // console.log(this.config);
    if (this.pinned || !this.config) return;

    if (this.config.value == "single") {
      // console.log("working");
      $(target)
        .children(".oneItems")
        .css({ visibility: "visible", height: "fit-content" });

      $(target)
        .children("a")
        .css({ display: "none" });

      return;
    }

    if (this.region === "right") {
      const left = $(target).width();
      $(target)
        .children(".left-inner-menu")
        .css({
          visibility: "visible",
          top: $(target).position().top + 5 + "px",
          right: left + "px"
        });
      return;
    }

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
    if (this.pinned || !this.config) return;

    if (this.config.value == "single") {
      // console.log("working");
      $(target)
        .children(".oneItems")
        .css({ visibility: "hidden", height: "0" });

      $(target)
        .children("a")
        .css({ display: "block" });

      return;
    }

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
