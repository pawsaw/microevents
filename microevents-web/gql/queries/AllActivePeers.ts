import { gql } from '@apollo/client';

export const ALL_ACTIVE_PEERS = gql`
  query AllActivePeers($skip: Int, $take: Int) {
    peers(common: { active: active, range: { skip: $skip, take: $take } }) {
      id
      life {
        createdAt
        updateAt
        deactivatedAt
      }
      username
    }
  }
`;
