import {AfterViewInit, Component, Input} from '@angular/core';
import {FlightTrack} from '../../interfaces/flight-track';
import {CesiumViewerService} from '../../services/cesium-viewer/cesium-viewer.service';
import {ApolloConnectorService} from '../../services/apollo-connector/apollo-connector.service';
import {calculatePoints} from '../../../utils/points';

@Component({
  selector: 'app-flight-track',
  templateUrl: './flight-track.component.html',
  styleUrls: ['./flight-track.component.css']
})
export class FlightTrackComponent implements AfterViewInit {
  @Input() track:FlightTrack;
  falldown:boolean;
  private entity:any;

  constructor(private cesiumViewerService:CesiumViewerService, private apolloConnectorService:ApolloConnectorService) {
    this.falldown = false;
  }

  ngAfterViewInit():void {
    let viewer = this.cesiumViewerService.viewer;
    this.entity = viewer.entities.add(this.createEntity());
    this.apolloConnectorService.trackUpdated(this.track.ident).subscribe(this.onTrackUpdated.bind(this));
    this.handleShooting(viewer);
  }

  onTrackUpdated(newResult):void {
    let track = newResult.trackUpdated.track;
    let points = calculatePoints(track);
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
    let points = calculatePoints(track);
    let lastPoint = track[track.length - 1];
    return {
      position: Cesium.Cartesian3.fromDegrees(lastPoint.longitude, lastPoint.latitude, lastPoint.altitude * 100),
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(points)
      },
      point: {
        color: Cesium.Color.BLUE,
        pixelSize: 10
      }
    };
  }

  private handleShooting(viewer) {
    let scene = viewer.scene;
    let handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction((movement) => {
      viewer.trackedEntity = undefined;
      this.flightSelected(scene, movement);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  private flightSelected(scene:any, movement) {
    let pickedObject = scene.pick(movement.position);
    if (Cesium.defined(pickedObject) && (pickedObject.id === this.entity)) {
      this.apolloConnectorService.shootingDownAirplane(this.track.ident).subscribe(falldown => {
        console.log(falldown, `${this.track.ident} is fallen? ${falldown}`);
        this.falldown = falldown;
        this.entity.point.color = Cesium.Color.RED;
      });
    }
  }
}
