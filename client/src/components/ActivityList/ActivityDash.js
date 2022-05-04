import React, { useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Square,
  Text,
  Button,
  useToast
} from '@chakra-ui/react';

import { useMutation } from '@apollo/client';
import { REMOVE_ACTIVITY } from '../../utils/mutations';

// import { useStoreContext } from '../../utils/state/UserContext';
// import { ADD_ACTIVITIES } from '../../utils/state/actions';

const ActivityDash = ({ activity }) => {
  const { _id, title, image, text } = activity;

  const toast = useToast();

  // const [, dispatch] = useStoreContext();

  const [removeActivity] = useMutation(REMOVE_ACTIVITY);

  // if remove activity is clicked
  const removeActivityHandler = async () => {
    // run mutation

    try {
      const response = await removeActivity({
        variables: { id: _id }
      });

      console.log('id', _id);
      console.log('response', response);

      // console.log(response);

      // dispatch({
      //   type: ADD_ACTIVITIES,
      //   activities: response.data.removeActivity.activities
      // });

      toast({
        title: 'Activity removed!',
        description: 'If you wish to add it again, go to the homepage',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error!',
        description: 'We were unable to remove the activity.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
    }
  };

  return (
    <Box margin={5}>
      <SimpleGrid
        className="activities"
        columns={2}
        border="2px"
        borderColor="#FFFFFF"
        borderRadius="md"
        bg="teal">
        <Square
          width="200px"
          height="200px"
          bgImg={require(`../../assets/activity-images/${image}`)}>
          <Text className="activity-text" fontSize="2xl" color="#81E6D9">
            {title}
          </Text>
        </Square>
        <Square color="#FFFFFF">{text}</Square>
      </SimpleGrid>
      <Button onClick={removeActivityHandler}>Remove Activity</Button>
    </Box>
  );
};

export default ActivityDash;
