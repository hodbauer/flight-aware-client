import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ApolloConnectorService} from '../../services/apollo-connector/apollo-connector.service';
import {Observable} from 'rxjs/Observable';
import {FlightTrack} from '../../interfaces/flight-track';
import {CesiumViewerService} from '../../services/cesium-viewer/cesium-viewer.service';

@Component({
  selector: 'app-cesium-container',
  templateUrl: './cesium-container.component.html',
  styleUrls: ['./cesium-container.component.css']
})
export class CesiumContainerComponent implements OnInit, AfterViewInit {
  cesiumId;
  departures:Observable<FlightTrack[]>;

  constructor(private apolloConnectorService:ApolloConnectorService, private cesiumViewerService:CesiumViewerService) {
  }

  ngOnInit() {
    this.cesiumId = this.cesiumViewerService.id;
  }

  ngAfterViewInit():void {
    this.initHomeLocation();

    this.departures = this.apolloConnectorService.getDepartures('LLBG');
  }

  private initHomeLocation():void {
    let west = 34.6882;
    let south = 31.8089;
    let east = 35.070007;
    let north = 32.1351;

    let rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;
  }
}
