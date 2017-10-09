import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ApolloModule} from 'apollo-angular';

import {AppComponent} from './app.component';
import {CesiumContainerComponent} from './components/cesium-container/cesium-container.component';
import {provideClient} from './apollo/init-client';
import {FlightTrackComponent} from './components/flight-track/flight-track.component';
import {ApolloConnectorService} from './services/apollo-connector/apollo-connector.service';
import {TracksComponent} from './components/tracks/tracks.component';
import {CesiumViewerService} from './services/cesium-viewer/cesium-viewer.service';
import {FlightCrashComponent} from './components/flight-crash/flight-crash.component';

@NgModule({
  declarations: [
    AppComponent,
    CesiumContainerComponent,
    FlightTrackComponent,
    TracksComponent,
    FlightCrashComponent
  ],
  imports: [
    BrowserModule,
    ApolloModule.forRoot(provideClient)
  ],
  providers: [ApolloConnectorService, CesiumViewerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
