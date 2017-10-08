import {Component, Input} from '@angular/core';
import {FlightTrack} from '../../interfaces/flight-track';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent {
  @Input() tracks:FlightTrack[];
}
