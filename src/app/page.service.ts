import { HttpClient } from "@angular/common/http";
import { Injectable, Inject, EventEmitter } from "@angular/core";
import { Observable, forkJoin } from "rxjs";

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

  done = new EventEmitter();

  constructor(private http: HttpClient, @Inject("AppData") private appData) {
    this.common_json_url = appData.comm_json;
    this.spec_json_url = appData.spec_json;
    this.content_json_url = appData.content_json;
    // this.lang_common_json_url = appData.lang_common_json;
    // this.lang_spec_json_url = appData.lang_spec_json;

    this.requestDataFromMultipleSources().subscribe(res => {
      this.allData = {
        common_json: res[0],
        spec_json: res[1],
        content: res[2]
      };

      //marging common and spec json
      Object.keys(this.allData.spec_json).forEach(key => {
        Object.keys(this.allData.spec_json[key]).forEach(secLevelKey => {
          this.allData.common_json[key][secLevelKey] = this.allData.spec_json[
            key
          ][secLevelKey];
        });
      });

      console.log(this.allData);
      // this.getBottomMenu();
      this.done.emit(this.allData);
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
    // const logo = {};

    return { styles, langs };
  }

  public getHeader() {
    // const styles = this.allData.common_json.regions.header.pull02.style.pull03
    //   .bgcolor;
    const menus = this.allData.common_json.regions.header.pull02.content.pull03;

    return menus;
  }

  public getLeft() {
    const styles = this.allData.common_json.regions.left.pull02.style.pull03;

    const menus = this.allData.common_json.regions.left.pull02.content.pull03;

    return { styles, menus };
  }

  public getRight() {
    const styles = this.allData.common_json.regions.right.pull02.style.pull03;
    const menus = this.allData.common_json.regions.right.pull02.content.pull03;

    return { styles, menus };
  }

  getSiteLogo() {
    const logo = this.allData.common_json.site.theme.pull02.st_logo.pull03
      .stl_site_logo.img;
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
}
