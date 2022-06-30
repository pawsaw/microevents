import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

const uri = 'http://localhost:3000/graphql';

// const httpLink = createHttpLink({
//   uri,
// });
const httpLink = createUploadLink({
  uri,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
    // fetchOptions: {
    //   mode: 'no-cors',
    // },
  };
});

export const apolloClient = new ApolloClient({
  // @ts-ignore
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export function apolloClientWithToken(
  token?: string,
): ApolloClient<NormalizedCacheObject> {
  // const httpLink = createHttpLink({
  //   uri',
  // });
  const httpLink = createUploadLink({
    uri,
  });

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const apolloClient = new ApolloClient({
    // @ts-ignore
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return apolloClient;
}
