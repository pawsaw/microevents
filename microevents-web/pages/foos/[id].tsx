import { GetServerSideProps, NextPage } from 'next';
import { apolloClientWithToken } from '../../apollo/client';
import { FIND_FOO_BY_ID } from '../../gql/queries/FindFooById';
import {
  FindFooById,
  FindFooByIdVariables,
  FindFooById_foo,
} from '../../gql/queries/__generated__/FindFooById';

// export interface FooPageProps {
//   id: string;
// }

// const FooPage: NextPage<FooPageProps> = ({ id }) => {
//   const {
//     data: foo,
//     loading,
//     error,
//   } = useQuery<FindFooById, FindFooByIdVariables>(FIND_FOO_BY_ID, {
//     variables: {
//       id,
//     },
//   });

//   return loading ? (
//     <span>Loading...</span>
//   ) : (
//     <div>
//       {foo?.foo.id} - {foo?.foo.text}
//     </div>
//   );
// };

export type Foo = FindFooById_foo;

export interface FooPageProps {
  foo: Foo;
}

const FooPage: NextPage<FooPageProps> = ({ foo }) => {
  return (
    <div>
      {foo.id} - {foo.text}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = apolloClientWithToken();

  const foo: Foo = (
    await client.query<FindFooById, FindFooByIdVariables>({
      query: FIND_FOO_BY_ID,
      variables: {
        id: context.params!.id as string,
      },
    })
  ).data.foo;

  return {
    props: {
      foo,
    },
  };
};

export default FooPage;
