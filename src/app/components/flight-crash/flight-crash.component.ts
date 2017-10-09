import {Component, Input, OnInit} from '@angular/core';
import {Point} from '../../interfaces/point';
import {CesiumViewerService} from '../../services/cesium-viewer/cesium-viewer.service';
import {calculatePoints} from '../../../utils/points';

@Component({
  selector: 'app-flight-crash',
  templateUrl: './flight-crash.component.html',
  styleUrls: ['./flight-crash.component.css']
})
export class FlightCrashComponent implements OnInit {
  @Input() firstPoint:Point;
  @Input() secondPoint:Point;
  points:Point[];
  private entity:any;
  private interval:any;
  private lonGap:number;
  private latGap:number;

  constructor(private cesiumViewerService:CesiumViewerService) {
    this.points = [];
  }

  ngOnInit() {
    let viewer = this.cesiumViewerService.viewer;
    this.points = [this.firstPoint];
    this.lonGap = this.firstPoint.longitude - this.secondPoint.longitude;
    this.latGap = this.firstPoint.latitude - this.secondPoint.latitude;
    this.entity = viewer.entities.add(this.createEntity());
    this.interval = setInterval(() => {
      let first = this.points[this.points.length - 1];
      let altitude = Math.floor(first.altitude);

      let point = {
        longitude: first.longitude + this.lonGap,
        latitude: first.latitude + this.latGap,
        altitude: altitude - 15
      };
      this.points.push(point);
      this.entity.polyline.positions = Cesium.Cartesian3.fromDegreesArrayHeights(calculatePoints(this.points));
      if (point.altitude <= 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  private createEntity() {
    return {
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(calculatePoints(this.points)),
        material: new Cesium.PolylineDashMaterialProperty({
          color: Cesium.Color.RED
        })
      }
    };
  }
}
