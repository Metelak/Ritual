import React from 'react';
import { Box, Circle, Square, Text, WrapItem } from '@chakra-ui/react';

const ActivityHome = ({ activity }) => {
  const { title, image } = activity;

  // text

  return (
    <WrapItem p={10}>
      <Circle
        className="activities"
        borderRadius="full"
        width="300px"
        height="300px"
        bgImg={require(`../../assets/activity-images/${image}`)}>
        <Text className="activity-text" fontSize="2xl" color="#81E6D9">
          {title}
        </Text>
      </Circle>
    </WrapItem>
  );
};
//Make this a modal attached to activityHome, make the {title a button for modal}
/* <Box>{text}</Box>
    <Box>
      <Button>add to my activities</Button>
    </Box> */

const ActivityDash = ({ activity }) => {
  const { title, image, text } = activity;
  return (
    <Box margin={10}>
      <Box className="activities" border="2px" p={3} m={2} borderRadius="md">
        <Square
          width="200px"
          bgImg={require(`../../assets/activity-images/${image}`)}
          height="200px">
          <Text className="activity-text" fontSize="2xl" color="#81E6D9">
            {title}
          </Text>
          <Box>{text}</Box>
        </Square>
      </Box>
    </Box>
  );
};

export { ActivityHome, ActivityDash };
