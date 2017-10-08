
import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-cesium-container',
  templateUrl: './cesium-container.component.html',
  styleUrls: ['./cesium-container.component.css']
})
export class CesiumContainerComponent implements AfterViewInit {
  cesiumId = 'cesiumContainer';
  private viewer:any;

  ngAfterViewInit():void {
    this.initHomeLocation();
    this.viewer = new Cesium.Viewer(this.cesiumId, {
      timeline: false,
      animation: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      geocoder: false,
      baseLayerPicker: false
    });
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
