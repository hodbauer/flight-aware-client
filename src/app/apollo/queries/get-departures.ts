import gql from 'graphql-tag';

export const getDeparturesQuery = gql`
query GetDepartures($airportCode:String!) {
  getDepartures(airportCode:$airportCode) {
    ident
    track {
      altitude
      latitude
      longitude
    }
  }
}
`;
