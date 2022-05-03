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
  SimpleGrid
} from '@chakra-ui/react';
import { ADD_ACTIVITY } from '../../utils/mutations';
import { QUERY_ME } from '../utils/queries';

const ActivityHome = ({ activity }) => {
  const { title, image, text } = activity;
  // add activity mutation setup
  const [addActivity, { error }] = useMutation(ADD_ACTIVITY);

  const addActivityHandler = async () => {
    try {
      await addActivity({
        variables: { id: _id }
      });
  }
  catch (err) {
    console.log(err);
  }
};

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

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
            <Button colorScheme="teal" variant="outline" onClick={addActivityHandler}>
              Save Activity
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Circle>
    </WrapItem>
  );
};

const ActivityDash = ({ activity }) => {
  const { title, image, text } = activity;

  const addActivity = () => {
    const { data: userData, loading } = useQuery(QUERY_ME);

    const allActivities = userData?.me.activities;
  
    if (loading) {
      return <div>Loading your activities...</div>;
    }
  
    let savedActivities;
    if (allActivities) {
      savedActivities = allActivities.filter((activity) => {
        return activity.isSaved === true;
      });
    }
    return (
      <Box margin={5}>
        <SimpleGrid className="activities" columns={2} border="2px" borderColor='#FFFFFF' borderRadius="md" bg="teal">
          <Square
            width="200px"
            height="200px"
            bgImg={require(`../../assets/activity-images/${image}`)}>
            <Text className="activity-text" fontSize="2xl" color="#81E6D9">
              {title}
            </Text>
          </Square>
          <Square color='#FFFFFF'>{text}</Square>
        </SimpleGrid>
      </Box>
    );
  }
}

export { ActivityHome, ActivityDash };
