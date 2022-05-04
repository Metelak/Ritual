import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Circle,
  Square,
  Text,
  WrapItem,
  SimpleGrid,
  useToast,
  Center
} from '@chakra-ui/react';

import { useMutation } from '@apollo/client';
import { ADD_ACTIVITY, REMOVE_ACTIVITY } from '../../utils/mutations';

import Auth from '../../utils/auth';

import { useStoreContext } from '../../utils/state/UserContext';
import { ADD_ACTIVITIES } from '../../utils/state/actions';

/*-----------------------
----- ACTIVITY HOME -----
-------------------------*/

const ActivityHome = ({ activity }) => {
  const { _id, title, image, text } = activity;

  const [state, dispatch] = useStoreContext();

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const [saveActivity] = useMutation(ADD_ACTIVITY);

  // if user clicks add activity on homepage
  const handleHomeClick = async () => {
    // validate user login
    if (!Auth.loggedIn()) {
      toast({
        title: 'Not logged in!',
        description: 'Please log in to save this activity',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
      return;
    }

    // run mutation
    try {
      const response = await saveActivity({
        variables: { id: _id }
      });

      dispatch({
        type: ADD_ACTIVITIES,
        activities: response.data.saveActivity.activities
      });

      toast({
        title: 'Activity saved!',
        description: 'To view the activity, go to your dashboard',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });

      onClose();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Save activity failed!',
        description: 'We could not save this activity. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
    }
  };

  return (
    <WrapItem p={10}>
      <Circle
        className="activities"
        onClick={onOpen}
        borderRadius="full"
        width="300px"
        height="300px"
        bgImg={require(`../../assets/activity-images/${image}`)}>
        <Text className="activity-text" fontSize="2xl" color="#81E6D9">
          {title}
        </Text>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{text}</ModalBody>
            <ModalFooter>
              <Button
                isDisabled={
                  state.activities.find((activity) => {
                    return activity._id === _id;
                  })
                    ? true
                    : false
                }
                colorScheme="teal"
                variant="outline"
                onClick={handleHomeClick}>
                Save Activity
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Circle>
    </WrapItem>
  );
};

/*-----------------------
----- ACTIVITY DASH -----
-------------------------*/

const ActivityDash = ({ activity }) => {
  const { _id, title, image, text } = activity;

  const toast = useToast();

  const [removeActivity] = useMutation(REMOVE_ACTIVITY);

  // if remove activity is clicked
  const removeActivityHandler = async () => {
    // run mutation
    try {
      await removeActivity({
        variables: { id: _id }
      });

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
      <Button onClick={removeActivityHandler}>Complete Activity</Button>
    </Box>
  );
};

export { ActivityHome, ActivityDash };
