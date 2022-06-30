import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useContext } from 'react';
import { ALL_ACTIVE_FOOS } from '../../gql/queries/AllActiveFoos';
import {
  AllActiveFoos,
  AllActiveFoosVariables,
} from '../../gql/queries/__generated__/AllActiveFoos';

export interface AllFoosPageProps {}

const AllFoosPage: NextPage<AllFoosPageProps> = () => {
  const {
    data: allActiveFoos,
    loading,
    error,
  } = useQuery<AllActiveFoos, AllActiveFoosVariables>(ALL_ACTIVE_FOOS, {
    variables: {},
  });

  const router = useRouter();

  return (
    <div>
      <h1>All active Foos</h1>
      {loading ? (
        <span>Loading</span>
      ) : (
        <div>
          {allActiveFoos?.foos.map((foo) => (
            <div key={foo.id}>
              <p>Id: {foo.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllFoosPage;
