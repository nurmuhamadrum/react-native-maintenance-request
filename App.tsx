import React from 'react';
import {ApolloProvider} from '@apollo/client';
import ApplicationNavigator from './Application';
import client from './apolloClient';

function App(): React.JSX.Element {
  return (
    <ApolloProvider client={client}>
      <ApplicationNavigator />
    </ApolloProvider>
  );
}

export default App;
