import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CarouselModule } from "ngx-owl-carousel-o";
import { LightboxModule } from 'ngx-lightbox';

import { AppComponent } from "./app.component";
import { TopSectionComponent } from "./top-section/top-section.component";
import { LeftSectionComponent } from "./left-section/left-section.component";
import { RightSectionComponent } from "./right-section/right-section.component";
import { BottomSectionComponent } from "./bottom-section/bottom-section.component";
import { MainComponent } from "./main/main.component";
import { HorizontalSliderComponent } from "./global/horizontal-slider/horizontal-slider.component";
import { VerticalSliderComponent } from "./global/vertical-slider/vertical-slider.component";
import { TopHeaderComponent } from "./top-header/top-header.component";
import { GarldruFooterComponent } from './garldru-footer/garldru-footer.component';
import { MultiResolutionDirective } from './directives/multi-resolution.directive';
import { ImgResComponent } from './img-res/img-res.component';

const routes: Routes = [{ path: "**", component: MainComponent }];

@NgModule({
  declarations: [
    AppComponent,
    TopSectionComponent,
    LeftSectionComponent,
    RightSectionComponent,
    BottomSectionComponent,
    MainComponent,
    HorizontalSliderComponent,
    VerticalSliderComponent,
    TopHeaderComponent,
    GarldruFooterComponent,
    MultiResolutionDirective,
    ImgResComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    CarouselModule,
    LightboxModule
  ],
  providers: [{ provide: "AppData", useValue: (<any>window).APP_DATA }],
  bootstrap: [AppComponent]
})
export class AppModule {}
