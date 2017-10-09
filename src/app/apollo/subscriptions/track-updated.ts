import gql from 'graphql-tag';

export const trackUpdatedSubscription = gql`
subscription trackUpdated($faFlightID:String!) {
  trackUpdated(faFlightID:$faFlightID) {
    ident
    track {
      altitude
      longitude
      latitude
    }
  }
}
`;
