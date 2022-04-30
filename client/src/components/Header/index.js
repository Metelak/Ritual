import React from 'react';
// import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Spacer,
  Button,
  ButtonGroup,
  Image
} from '@chakra-ui/react';
// import Auth from '../../utils/auth';

// import login from Login.js
import Login from '../../pages/Login';

const Header = () => {
  // const logout = (event) => {
  //   event.preventDefault();
  //   Auth.logout();
  // };

  return (
    <header>
      <div>
        <Flex minWidth="max-content" alignItems="center" gap="2" bg='#2C7A7B'>
          <Image
            width= '100px'
            height= '75px'
            objectFit="cover"
            src={require('../../assets/Ritual_logos/lotus-logo-white.png')}
            alt="lotus logo"
          />
          <Box p="2">
            <Heading as="h1" size="4xl" isTruncated color='#FFFFFF'>
              Ritual
            </Heading>
          </Box>
          <Spacer />
          <ButtonGroup gap="2">
            <Button colorScheme='whiteAlpha' variant='outline'>Sign Up</Button>
            <Button colorScheme='whiteAlpha' variant='outline'>Log in</Button>
          </ButtonGroup>
        </Flex>
      </div>
    </header>
  );
};

export default Header;
