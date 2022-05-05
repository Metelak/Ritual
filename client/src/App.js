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
import Dashboard from '../src/pages/Dashboard';
import Home from './pages/Home';
import CompletedGoals from './pages/CompletedGoals';
import { Center, Text } from '@chakra-ui/react';

import { StoreProvider } from './utils/state/UserContext';

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
        <StoreProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="completed-goals" element={<CompletedGoals />}></Route>
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
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
