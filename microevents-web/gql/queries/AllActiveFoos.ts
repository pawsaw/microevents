import { gql } from '@apollo/client';

export const ALL_ACTIVE_FOOS = gql`
  query AllActiveFoos($skip: Int, $take: Int) {
    foos(common: { active: active, range: { skip: $skip, take: $take } }) {
      id
      life {
        createdAt
        updateAt
        deactivatedAt
      }
      bars {
        id
        text
      }
    }
  }
`;
