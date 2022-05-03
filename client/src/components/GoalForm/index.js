import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_GOAL } from '../../utils/mutations';

import { useStoreContext } from '../../utils/state/UserContext';
import { ADD_GOALS } from '../../utils/state/actions';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useDisclosure,
  FormErrorMessage,
  useToast,
  Progress,
  ModalCloseButton
} from '@chakra-ui/react';
import { SmallAddIcon } from '@chakra-ui/icons';

const GoalForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  // use toast from Chakra UI
  const toast = useToast();

  // global state declaration (only using reducer)
  const [, dispatch] = useStoreContext();

  // state of goal Form
  const [goalState, setGoalState] = useState({ name: '', description: '' });
  // error text state
  const [errorMessage, setError] = useState({ type: '', message: '' });
  // set character lengths
  const [nameLength, setNameLength] = useState(0);
  const [descriptionLength, setDescriptionLength] = useState(0);

  // add Goal mutation setup
  const [addGoal] = useMutation(ADD_GOAL);

  // update goalState when user adds things in input
  const handleChange = (event) => {
    const { name, value } = event.target;

    // set progress bar length
    if (name === 'name') {
      let progressLength = (value.length / 280) * 100;
      setNameLength(progressLength);
    } else {
      let progressLength = (value.length / 280) * 100;
      setDescriptionLength(progressLength);
    }

    // add input to setGoalState
    setGoalState({
      ...goalState,
      [name]: value
    });
  };

  const handleFormSubmit = async () => {
    const { name, description } = goalState;

    // validate name
    if (!name) {
      setError({ type: 'name', message: `Please enter your goal's name` });

      return;
    }
    // validate name length
    if (name.length > 280) {
      setError({
        type: 'name',
        message: 'Name cannot be more than 280 characters'
      });

      return;
    }
    // validate description
    if (!description) {
      setError({ type: 'description', message: 'Please describe your goal' });

      return;
    }
    // validate name length
    if (description.length > 280) {
      setError({
        type: 'description',
        message: 'Description cannot be more than 280 characters'
      });

      return;
    }

    // add goalState to mutation
    try {
      const response = await addGoal({
        variables: {
          name: name,
          description: description
        }
      });

      console.log(response);

      // add to global state
      dispatch({
        type: ADD_GOALS,
        goals: response.data.addGoal.goals
      });

      // reset goalState
      setGoalState({ name: '', description: '' });
      // reset errorMessage
      setError({ type: '', message: '' });

      // success toast
      toast({
        title: 'Goal added!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });

      // close modal
      onClose();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error!',
        description: 'Goal was not added',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
    }
  };

  return (
    <>
      <Button
        leftIcon={<SmallAddIcon />}
        onClick={onOpen}
        size="md"
        colorScheme="teal">
        Add Goal
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Goal</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl
              isInvalid={errorMessage.type === 'name' ? true : false}>
              <FormLabel>Name:</FormLabel>
              <Input
                name="name"
                placeholder="What is the goal name?"
                onChange={handleChange}
                value={goalState.name}
              />
              <Progress
                colorScheme={nameLength >= 100 ? 'red' : 'green'}
                size="sm"
                value={nameLength}
              />
              {errorMessage.type === 'name' && (
                <FormErrorMessage>{errorMessage.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={errorMessage.type === 'description' ? true : false}>
              <FormLabel>Description:</FormLabel>
              <Textarea
                name="description"
                id="description"
                type="description"
                placeholder="Write your goal here."
                resize="none"
                value={goalState.description}
                onChange={handleChange}
              />
              <Progress
                colorScheme={descriptionLength >= 100 ? 'red' : 'green'}
                size="sm"
                value={descriptionLength}
              />
              {errorMessage.type === 'description' && (
                <FormErrorMessage>{errorMessage.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleFormSubmit}
              mr={3}
              colorScheme="teal"
              // isLoading={props.isSubmitting}
              type="submit">
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GoalForm;
