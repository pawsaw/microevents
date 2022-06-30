import { ApolloError, useQuery } from '@apollo/client';
import { ALL_ACTIVE_PEERS } from '../../gql/queries/AllActivePeers';
import {
  AllActivePeers,
  AllActivePeersVariables,
  AllActivePeers_peers,
} from '../../gql/queries/__generated__/AllActivePeers';

export type Peer = AllActivePeers_peers;

export interface UseActivePeersResult {
  peers?: Peer[];
  loading: boolean;
  error?: ApolloError;
}

export const useActivePeers = (): UseActivePeersResult => {
  const { data, loading, error } = useQuery<
    AllActivePeers,
    AllActivePeersVariables
  >(ALL_ACTIVE_PEERS, {
    variables: {
      take: 10,
    },
  });

  return {
    peers: data?.peers ?? undefined,
    loading,
    error,
  };
};
