import { HttpClient } from "@angular/common/http";
import { Injectable, Inject, EventEmitter } from "@angular/core";
import { Observable, forkJoin } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PageService {
  common_json_url: string;
  spec_json_url: string;
  // lang_common_json_url: string;
  // lang_spec_json_url: string;

  allData: any;

  done = new EventEmitter();

  constructor(private http: HttpClient, @Inject("AppData") private appData) {
    this.common_json_url = appData.comm_json;
    this.spec_json_url = appData.spec_json;
    // this.lang_common_json_url = appData.lang_common_json;
    // this.lang_spec_json_url = appData.lang_spec_json;

    this.requestDataFromMultipleSources().subscribe(res => {
      this.allData = {
        common_json: res[0],
        spec_json: res[1]
      };

      console.log(this.allData);
      // this.getBottomMenu();
      this.done.emit(this.allData);
    });
  }

  public requestDataFromMultipleSources(): Observable<any[]> {
    let response1 = this.http.get(this.common_json_url);
    let response2 = this.http.get(this.spec_json_url);
    // let response3 = this.http.get(this.lang_common_json_url);
    // let response4 = this.http.get(this.lang_spec_json_url);
    return forkJoin([response1, response2]);
  }

  public getBottomMenu() {
    const data = this.allData.common_json.regions.bottom.pull02.content.pull03;
    return data;
  }

  public getBottomStyle() {
    return this.allData.common_json.regions.bottom.pull02.style.pull03.bgcolor;
  }

  public getTop() {
    const styles = this.allData.common_json.regions.top.pull02.style.pull03
      .bgimage;
    const langs = this.allData.common_json.langs;
    const logo = {};

    return { styles, langs, logo };
  }

  public getHeader() {
    const styles = this.allData.common_json.regions.header.pull02.style.pull03
      .bgcolor;
    const menus = this.allData.common_json.regions.header.pull02.content.pull03;

    return { styles, menus };
  }

  public getLeft() {
    const styles = this.allData.common_json.regions.left.pull02.style.pull03;

    const menus = this.allData.common_json.regions.left.pull02.content.pull03;

    return { styles, menus };
  }

  public getRight() {
    const styles = this.allData.common_json.regions.right.pull02.style.pull03
      .bgcolor;
    const menus = this.allData.common_json.regions.right.pull02.content.pull03;

    return { styles, menus };
  }

  getSiteLogo() {
    const logo = this.allData.common_json.site.theme.pull02.st_logo.pull03
      .stl_site_logo.img;
    return logo;
  }
}
