import {Injectable} from '@angular/core';

@Injectable()
export class CesiumViewerService {
  private _viewer:any;

  init() {
    this._viewer = new Cesium.Viewer(this.id, {
      timeline: false,
      animation: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      geocoder: false,
      baseLayerPicker: false,
      infoBox: false,
      selectionIndicator: false
    });
  }

  get id():string {
    return 'cesiumContainer';
  }

  get viewer():any {
    if (!this._viewer) {
      this.init();
    }

    return this._viewer;
  }

}
