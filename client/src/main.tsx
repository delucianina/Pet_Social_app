import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './store/index.tsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App.tsx';
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

// MAKE APOLLO CLIENT 
export const client = new ApolloClient({
  link: from([errorLink, new HttpLink({ uri: '/graphql' })]),
  uri: '/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </StoreProvider>
    </ApolloProvider>
  </StrictMode >,
)
