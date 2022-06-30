import { gql } from '@apollo/client';

export const FIND_FOO_BY_ID = gql`
  query FindFooById($id: ID!) {
    foo(id: $id) {
      id
      life {
        createdAt
        updateAt
        deactivatedAt
      }
      text
      bars {
        id
        text
      }
    }
  }
`;
