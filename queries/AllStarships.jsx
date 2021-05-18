import gql from 'graphql-tag';

export default gql`
  query {
    allStarships {
      starships {
        id
        name
        hyperdriveRating
      }
    }
  }
`;
