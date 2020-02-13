import { environment } from "./../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable, Inject, EventEmitter } from "@angular/core";
import { Observable, forkJoin } from "rxjs";
declare var $: any;

@Injectable({
  providedIn: "root"
})
export class PageService {
  common_json_url: string;
  spec_json_url: string;
  content_json_url: string;
  // lang_common_json_url: string;
  // lang_spec_json_url: string;

  allData: any;

  done = new EventEmitter(true);

  constructor(private http: HttpClient, @Inject("AppData") private appData) {
    this.common_json_url = appData.comm_json;
    this.spec_json_url = appData.spec_json;
    this.content_json_url = appData.content_json;
    // this.lang_common_json_url = appData.lang_common_json;
    // this.lang_spec_json_url = appData.lang_spec_json;

    this.requestDataFromMultipleSources().subscribe(res => {
      this.allData = {
        common_json: res[0] || {},
        spec_json: res[1] || {},
        content: res[2] || {}
      };

      //marging common and spec json
      try {
        Object.keys(this.allData.spec_json).forEach(key => {
          Object.keys(this.allData.spec_json[key]).forEach(secLevelKey => {
            this.allData.common_json[key][secLevelKey] = this.allData.spec_json[
              key
            ][secLevelKey];
          });
        });
      } catch (err) {
        // const confirmationn = window.confirm(
        //   "Error occured while merging the json data. Dow you want to @reload?"
        // );
        // console.log(window.location.href);
        // if (confirmationn)
        //   window.location.href = window.location.href + "@reload";
        console.error("Error Occured while merging the json data.", err);
      }

      // if (!environment.production) {
      console.log(this.allData);
      // }
      // this.getBottomMenu();
      this.done.emit(this.allData);

      // remove the loading class from body
      const loadingBody = document.querySelector("body.loading");
      if (loadingBody) {
        loadingBody.className = "";
      }
    });
  }

  public requestDataFromMultipleSources(): Observable<any[]> {
    let response1 = this.http.get(this.common_json_url);
    let response2 = this.http.get(this.spec_json_url);
    let response3 = this.http.get(this.content_json_url);
    // let response4 = this.http.get(this.lang_spec_json_url);
    return forkJoin([response1, response2, response3]);
  }

  // public getFontColor() {
  //   return this.allData.common_json.site.theme.pull02.st_font.pull03
  //     .stf_font_color.pull04;
  // }

  public getBottomMenu() {
    const data = this.allData.common_json.regions.bottom.pull02.content.pull03;
    return data;
  }

  public getTop() {
    const styles = this.allData.common_json.regions.top.pull02.style;
    const langs = this.allData.common_json.langs;

    return { styles, langs };
  }

  public getHeader() {
    // const styles = this.allData.common_json.regions.header.pull02.style.pull03
    //   .bgcolor;
    const menus = this.allData.common_json.regions.header.pull02.content.pull03;

    return menus;
  }

  public getLeft() {
    const menus = this.allData.common_json.regions.left.pull02.content.pull03;

    return menus;
  }

  public getRight() {
    const menus = this.allData.common_json.regions.right.pull02.content.pull03;

    return menus;
  }

  get siteLogo() {
    let width = window.innerWidth;
    let logo = "";
    if (width <= 500) {
      //mobile
      // console.log("mobile");
      logo = this.allData.common_json.site.theme.pull02.st_logo.pull03
        .stl_mobile_logo.img;
    } else if (width <= 1170) {
      // console.log("tablet");
      //tablet
      logo = this.allData.common_json.site.theme.pull02.st_logo.pull03
        .stl_tablet_logo.img;
    } else if (width < 3200) {
      //desktop
      // console.log("desktop");
      logo = this.allData.common_json.site.theme.pull02.st_logo.pull03
        .stl_desktop_logo.img;
    } else {
      //4k
      // console.log("4k");
      logo = this.allData.common_json.site.theme.pull02.st_logo.pull03
        .stl_4k_logo.img;
    }
    // console.log(logo);
    return logo;
  }

  getSiteTitle() {
    return this.allData.spec_json.site.general.pull02.sg_site_title.value;
  }

  getSiteSubtitle() {
    return this.allData.spec_json.site.general.pull02.sg_site_subtitle.value;
  }

  getSiteThumbRes() {
    const str: string = this.allData.common_json.site.images.pull02
      .si_thumb_resolutions.value;
    return str.split(" ");
  }

  getSiteZoomRes() {
    const str: string = this.allData.common_json.site.images.pull02
      .si_zoom_resolutions.value;
    return str.split(" ");
  }

  getBreakPoints() {
    const raw = this.allData.common_json.site.images.pull02
      .breakpoints_information.pull03;
    const obj = {};
    raw.forEach(p => {
      obj[p.break] = p.resolution;
    });
    return obj;
  }

  get cLink() {
    return this.allData.content.articles.clink;
  }

  get diamondFlags() {
    return this.allData.content.diamond_langs;
  }

  get cookieMessage() {
    return this.allData.common_json.cookies_warning.information.pull02
      .main_cookies_msg.value;
  }
}
