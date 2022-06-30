/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePeer
// ====================================================

export interface CreatePeer_createPeer_life {
  __typename: "Life";
  createdAt: any;
  updateAt: any | null;
  deactivatedAt: any | null;
}

export interface CreatePeer_createPeer {
  __typename: "Peer";
  id: string;
  life: CreatePeer_createPeer_life;
  username: string;
}

export interface CreatePeer {
  createPeer: CreatePeer_createPeer;
}

export interface CreatePeerVariables {
  username: string;
}
