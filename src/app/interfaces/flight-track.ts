export interface FlightTrack {
  ident:string;
  track:Partial<Track>[];
}

interface Track {
  altitude:number;
  altitude_change:string;
  altitude_status:string;
  groundspeed:string;
  latitude:number;
  longitude:number;
  timestamp:number;
  update_type:string;
}
