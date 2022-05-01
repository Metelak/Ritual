import React from 'react';
import {
  Box,
  Button,
  Circle,
  Square,
  SimpleGrid,
  Text
} from '@chakra-ui/react';

const ActivityHome = ({ activity }) => {
  const { title, image, text } = activity;

  return (
    <SimpleGrid
      className="activities"
      margin={10}
      columns={3}
      minChildWidth="200px"
      spacing={10}
      border="2px"
      borderRadius="md">
      <Box key={title}>
        <Text className="activity-text" fontSize="2xl" color="#81E6D9">
          {title}
        </Text>
        <Square
          width="300px"
          height="300px"
          bgImg={require(`../../assets/activity-images/${image}`)}></Square>
      </Box>
      <Box>{text}</Box>
      <Box>
        <Button>add to my activities</Button>
      </Box>
    </SimpleGrid>
  );
};

const ActivityCircle = ({ activity }) => {
  const { title, image, text } = activity;
  return (
    <Box margin={10}>
      <Circle
        className="activities"
        key={title}
        borderRadius="full"
        border="2px"
        width="200px"
        bg="teal"
        bgImg={require(`../../assets/activity-images/${image}`)}
        height="200px">
        <Text className="activity-text" fontSize="2xl" color="#81E6D9">
          {title}
        </Text>
        <div>{text}</div>
      </Circle>
    </Box>
  );
};

export { ActivityHome, ActivityCircle };
