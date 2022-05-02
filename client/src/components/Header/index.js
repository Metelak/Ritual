import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
  Image,
  Button
} from '@chakra-ui/react';
// import Auth from '../../utils/auth';

// import login from Login.js
import LoginForm from './Login';

// import SignupForm from SignupForm.js
import SignupForm from './Signup';

// import logout() from Auth.js
import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // TODO: Get logout button to generate automatically, without manually refreshing the page. New route?

  return (
    <header>
      <div>
        <Flex minWidth="max-content" alignItems="center" gap="2" bg="#2C7A7B">
          <Link to="/">
            <Image
              pl="3"
              width="100px"
              height="75px"
              objectFit="cover"
              src={require('../../assets/Ritual_logos/lotus-logo-white.png')}
              alt="lotus logo"
            />
          </Link>
          <Link to="/">
            <Box p="3">
              <Heading as="h1" size="4xl" isTruncated color="#FFFFFF">
                RITUAL
              </Heading>
            </Box>
          </Link>
          <Spacer />
          {Auth.loggedIn() ? (
            <>
              <ButtonGroup gap="2" pr="3">
                <Button onClick={Auth.logout}>Logout</Button>
              </ButtonGroup>
            </>
          ) : (
            <ButtonGroup gap="2" pr="3">
              <SignupForm colorScheme="whiteAlpha" variant="outline">
                Sign Up
              </SignupForm>
              <LoginForm colorScheme="whiteAlpha" variant="outline">
                Login
              </LoginForm>
            </ButtonGroup>
          )}
        </Flex>
      </div>
    </header>
  );
};

export default Header;
