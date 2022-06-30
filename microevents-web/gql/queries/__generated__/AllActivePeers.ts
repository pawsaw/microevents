/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllActivePeers
// ====================================================

export interface AllActivePeers_peers_life {
  __typename: "Life";
  createdAt: any;
  updateAt: any | null;
  deactivatedAt: any | null;
}

export interface AllActivePeers_peers {
  __typename: "Peer";
  id: string;
  life: AllActivePeers_peers_life;
  username: string;
}

export interface AllActivePeers {
  peers: AllActivePeers_peers[];
}

export interface AllActivePeersVariables {
  skip?: number | null;
  take?: number | null;
}
