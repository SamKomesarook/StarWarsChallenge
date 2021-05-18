import gql from 'graphql-tag';

export default gql`
  query Starship($id: ID) {
    starship(id: $id) {
      pilotConnection {
        pilots {
          name
        }
      }
    }
  }
`;
