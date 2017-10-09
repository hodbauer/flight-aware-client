import {AfterViewInit, Component, Input} from '@angular/core';
import {FlightTrack} from '../../interfaces/flight-track';
import {CesiumViewerService} from '../../services/cesium-viewer/cesium-viewer.service';
import {ApolloConnectorService} from '../../services/apollo-connector/apollo-connector.service';

@Component({
  selector: 'app-flight-track',
  templateUrl: './flight-track.component.html',
  styleUrls: ['./flight-track.component.css']
})
export class FlightTrackComponent implements AfterViewInit {
  @Input() track:FlightTrack;
  private entity:any;

  constructor(private cesiumViewerService:CesiumViewerService, private apolloConnectorService:ApolloConnectorService) {
  }

  ngAfterViewInit():void {
    let viewer = this.cesiumViewerService.viewer;
    this.entity = viewer.entities.add(this.createEntity());
    this.apolloConnectorService.trackUpdated(this.track.ident).subscribe(this.onTrackUpdated.bind(this));
  }

  onTrackUpdated(newResult):void {
    let track = newResult.trackUpdated.track;
    let points = this.calculatePoints(track);
    let lastPoint = track[track.length - 1];

    this.entity.polyline.material = Cesium.Color.YELLOW;
    this.entity.position = Cesium.Cartesian3.fromDegrees(lastPoint.longitude, lastPoint.latitude, lastPoint.altitude * 100);
    this.entity.polyline.positions = Cesium.Cartesian3.fromDegreesArrayHeights(points);
    setTimeout(() => {
      this.entity.polyline.material = Cesium.Color.WHITE;
    }, 3000);
  }

  private createEntity():any {
    let track = this.track.track;
    let points = this.calculatePoints(track);
    let lastPoint = track[track.length - 1];
    return {
      position: Cesium.Cartesian3.fromDegrees(lastPoint.longitude, lastPoint.latitude, lastPoint.altitude * 100),
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(points)
      },
      point: {
        color: Cesium.Color.RED,
        pixelSize: 5
      }
    };
  }

  private calculatePoints(track):number[] {
    let points = [];
    for (let point of track) {
      points.push(point.longitude, point.latitude, point.altitude * 100);
    }

    return points;
  }
}
