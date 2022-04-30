import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <footer>
      <div>
        <Flex minWidth="max-content" alignItems="center" gap="2" bg="#2C7A7B">
          <Box p="3">
              <Text fontSize='xl' color='#FFFFFF'>
              From the CRMMMM developers &copy;{new Date().getFullYear()}
              </Text>
          </Box>
        </Flex>
      </div>
    </footer>
  );
};

export default Footer;
