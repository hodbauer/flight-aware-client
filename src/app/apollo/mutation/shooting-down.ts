import gql from 'graphql-tag';

export const shooingDownMutation = gql`
mutation shootingDown($faFlightID:String!) {
  shootingDownAirplane(faFlightID:$faFlightID)
}
`;
