import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

const ActivityHome = ({ activity }) => {
  const { title, image, text } = activity;

  return (
    <Box margin={10}>
      <Box key={title} border="2px" p={3} m={2} borderRadius="md">
        <Text fontSize="2xl">{title}</Text>
        <div>{image}</div>
        <div>{text}</div>
        <Button>add to my activities</Button>
      </Box>
    </Box>
  );
};

const ActivityCircle = ({ activity }) => {
  const { title, image, text } = activity;
  return (
    <Box margin={10}>
      <Box
        key={title}
        borderRadius="full"
        border="2px"
        width="200px"
        // bgImg={require(`../../assets/Ritual_logos/${image}`)}
        height="200px">
        <Text fontSize="2xl">{title}</Text>
        <div>{text}</div>
        <div>activityImage: {image}</div>
      </Box>
    </Box>
  );
};

export { ActivityHome, ActivityCircle };
