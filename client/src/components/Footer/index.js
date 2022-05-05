import React from 'react';
import { Box, Center, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <div className='wrapper'>
      <Center
        className="footer"
        minWidth="max-content"
        alignItems="center"
        gap="2"
        bg="#FFFFFF">
        <Box p="5">
          <Text fontSize="lg" color="teal">
            From the CRMMMM developers &copy;{new Date().getFullYear()}
          </Text>
        </Box>
      </Center>
    </div>
  );
};

export default Footer;
