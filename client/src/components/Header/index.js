import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
  Image,
  Button,
  extendTheme
} from '@chakra-ui/react';

// to redirect user to Dashboard if button is clicked while user is logged in.
import { useNavigate } from 'react-router-dom';

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

<<<<<<< HEAD
=======
  // useNavigate to redirect user to Dashboard using onClick
  const routeToMyDashboard = useNavigate();

  // TODO: Get logout button to generate automatically, without manually refreshing the page. New route?

>>>>>>> 23581d3631b3988734766bb5ac5c142424c2d49a
  return (
    <header>
      <div>
        <Flex minWidth="max-content" alignItems="center" gap="2" bg="#2C7A7B">
          <Link to="/">
            <Box size={{sm:'md', xl:'lg'}}>
            <Image
              pl="3"
              width="100px"
              height="75px"
              objectFit="cover"
              src={require('../../assets/Ritual_logos/lotus-logo-white.png')}
              alt="lotus logo"
            />
            </Box>
          </Link>
          <Link to="/">
            <Box p="3">
              <Heading as="h1" size='4xl' isTruncated color="#FFFFFF">
                RITUAL
              </Heading>
            </Box>
          </Link>
          <Spacer />
          {Auth.loggedIn() ? (
            <>
              <ButtonGroup gap="2" pr="3">
                <Button onClick={ () => routeToMyDashboard('/Dashboard')} color='#FFFFFF' variant="ghost" _hover={{ bg: 'teal.300' }}>My Dashboard</Button>
                <Button onClick={Auth.logout} color='#FFFFFF' variant="ghost" _hover={{ bg: 'teal.300' }}>Logout</Button>
              </ButtonGroup>
            </>
          ) : (
            <ButtonGroup gap="2" pr="3">
              <SignupForm >
                Sign Up
              </SignupForm>
              <LoginForm>
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
