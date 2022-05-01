import React from 'react';
import { Box, Circle, Text } from '@chakra-ui/react';

const ActivityHome = ({ activity }) => {
  const { title, image } = activity;

  // text

  return (
    <div>
      <Circle
        className="activities"
        borderRadius="full"
        width="400px"
        height="400px"
        m={10}
        bgImg={require(`../../assets/activity-images/${image}`)}>
        <Text className="activity-text" fontSize="2xl" color="#81E6D9">
          {title}
        </Text>
      </Circle>
    </div>
  );
};
//Make this a modal attached to activityHome
/* <Box>{text}</Box>
    <Box>
      <Button>add to my activities</Button>
    </Box> */

const ActivityCircle = ({ activity }) => {
  const { title, image, text } = activity;
  return (
    <Box margin={10}>
      <Circle
        className="activities"
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
