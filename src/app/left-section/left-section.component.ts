import { PageService } from "./../page.service";
import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChildren,
  QueryList
} from "@angular/core";
declare var $: any;

@Component({
  selector: "app-left-section",
  templateUrl: "./left-section.component.html",
  styleUrls: ["./left-section.component.scss"]
})
export class LeftSectionComponent implements OnInit, AfterViewInit {
  constructor(public service: PageService) {}

  mainItems = [];
  @Input("config") config: any = {};
  @ViewChildren("oneItems") oneItems: QueryList<any>;

  pinned = false;

  ngOnInit() {
    this.service.done.subscribe(data => {
      this.mainItems = data["common_json"]["left"];
    });
  }

  ngAfterViewInit() {
    // console.log(this.config);
    this.oneItems.changes.subscribe(t => {
      console.log("working view children");
      this.initOneSlider();
    });
  }

  showInnerMenu({ target }) {
    if (this.pinned) return;
    const left = $(target).width() + $(target).position().left;
    $(target)
      .children(".left-inner-menu")
      .css({
        display: "block",
        top: $(target).position().top + 5 + "px",
        left: left + "px"
      });
  }
  hideInnerMenu({ target }) {
    if (this.pinned) return;
    $(target)
      .children(".left-inner-menu")
      .css({
        display: "none"
      });
  }

  toggleSticky() {
    this.pinned = !this.pinned;
    // alert(this.pinned);
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
