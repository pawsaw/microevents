import { gql } from '@apollo/client';

export const CREATE_PEER = gql`
  mutation CreatePeer($username: String!) {
    createPeer(createPeerInput: { username: $username }) {
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
