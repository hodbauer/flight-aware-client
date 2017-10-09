import {AfterViewInit, Component, Input} from '@angular/core';
import {FlightTrack} from '../../interfaces/flight-track';
import {CesiumViewerService} from '../../services/cesium-viewer/cesium-viewer.service';

@Component({
  selector: 'app-flight-track',
  templateUrl: './flight-track.component.html',
  styleUrls: ['./flight-track.component.css']
})
export class FlightTrackComponent implements AfterViewInit {
  @Input() track:FlightTrack;

  constructor(private cesiumViewerService:CesiumViewerService) {
  }

  ngAfterViewInit():void {
    let viewer = this.cesiumViewerService.viewer;
    viewer.entities.add(this.createPolyline());
  }

  private createPolyline():any {
    let points = [];
    for (let point of this.track.track) {
      points.push(point.longitude, point.latitude, point.altitude * 100);
    }
    return {
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(points)
      }
    };
  }
}
