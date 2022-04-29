import React from 'react';
import './App.css';
import logoImage from '../src/assets/Ritual_logos/Ritual_logo_grey_500x500.png';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from '../src/components/Header';
import Footer from '../src/components/Footer';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    
      <ApolloProvider client={client}>
        <Router>
        <div>
          <Header />
          <div className="App">
            <h1>Ritual App under construction</h1>
            <img src={logoImage}></img>
            <h3>From the CRMMMM developers</h3>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
