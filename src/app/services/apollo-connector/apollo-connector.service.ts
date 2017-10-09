import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {getDeparturesQuery} from '../../apollo/queries/get-departures';
import {FlightTrack} from '../../interfaces/flight-track';
import {mockSubscription} from '../../apollo/subscriptions/mock';
import {trackUpdatedSubscription} from '../../apollo/subscriptions/track-updated';
import {shooingDownMutation} from '../../apollo/mutation/shooting-down';

@Injectable()
export class ApolloConnectorService {

  constructor(private apollo:Apollo) {
  }

  getDepartures(airportCode:string):Observable<FlightTrack[]> {
    return this.apollo.query<{ getDepartures:FlightTrack[] }>({
      query: getDeparturesQuery,
      variables: {airportCode}
    }).map(result => result.data.getDepartures);
  }

  mockSub():Observable<any> {
    return this.apollo.subscribe({
      query: mockSubscription
    });
  }

  trackUpdated(faFlightID:string):Observable<any> {
    return this.apollo.subscribe({
      query: trackUpdatedSubscription,
      variables: {faFlightID}
    });
  }

  shootingDownAirplane(faFlightID:string):Observable<boolean> {
    return this.apollo.mutate<any>({
      mutation: shooingDownMutation,
      variables: {faFlightID}
    }).map(result => result.data.shootingDownAirplane);
  }
}
