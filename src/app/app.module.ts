import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CesiumContainerComponent } from './components/cesium-container/cesium-container.component';

@NgModule({
  declarations: [
    AppComponent,
    CesiumContainerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
