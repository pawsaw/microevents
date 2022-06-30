import { NextPage } from 'next';
import { useActivePeers } from '../../domain/peers';

export interface AllPeerPageProps {}

const AllPeerPage: NextPage<AllPeerPageProps> = () => {
  const { loading, peers } = useActivePeers();

  return (
    <div>
      <h1>All active Peers</h1>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          {peers?.map((peer) => (
            <div key={peer.id}>
              <p>username: {peer.username}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPeerPage;
