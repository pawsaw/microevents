import React, { ReactElement } from 'react';
import { ApolloProvider } from '@apollo/client';

import type { AppProps /*, AppContext */ } from 'next/app';
import '../styles/global.scss';
import { apolloClient } from '../apollo/client';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
