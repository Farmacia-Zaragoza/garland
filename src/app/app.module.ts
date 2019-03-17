import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { TopSectionComponent } from "./top-section/top-section.component";
import { LeftSectionComponent } from "./left-section/left-section.component";
import { RightSectionComponent } from "./right-section/right-section.component";
import { BottomSectionComponent } from "./bottom-section/bottom-section.component";
import { MainComponent } from "./main/main.component";
import { HorizontalSliderComponent } from './global/horizontal-slider/horizontal-slider.component';
import { VerticalSliderComponent } from './global/vertical-slider/vertical-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    TopSectionComponent,
    LeftSectionComponent,
    RightSectionComponent,
    BottomSectionComponent,
    MainComponent,
    HorizontalSliderComponent,
    VerticalSliderComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
