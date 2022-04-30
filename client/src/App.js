import React from 'react';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <Home></Home>
          <Dashboard></Dashboard>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
