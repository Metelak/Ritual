import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { Center, Text } from '@chakra-ui/react';

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
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          {/* catch any routes that are not listed above and return this */}
          <Route
            path="*"
            element={
              <section>
                <Center height="88.6vh">
                  <Text fontSize="5xl">There's nothing here!</Text>
                </Center>
              </section>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
