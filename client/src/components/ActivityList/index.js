import React from 'react';
import { Box, Button, Circle, Text } from '@chakra-ui/react';

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
        <Circle
          className='activity-circles'
          key={title}
          borderRadius="full"
          border="2px"
          width="200px"
          bg='teal'
          bgImg={require(`../../assets/activity-images/${image}`)}
          height="200px">
          <Text className='circle-text' fontSize="2xl" color='#81E6D9'>{title}</Text>
          <div>{text}</div>
        </Circle>
    </Box>
  );
};

export { ActivityHome, ActivityCircle };
