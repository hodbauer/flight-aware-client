import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {getDeparturesQuery} from '../../apollo/queries/get-departures';
import {FlightTrack} from '../../interfaces/flight-track';
import {mockSubscription} from '../../apollo/subscriptions/mock';

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

  mockSub() {
    return this.apollo.subscribe({
      query: mockSubscription
    });
  }
}
