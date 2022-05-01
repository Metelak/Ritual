import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_GOAL } from '../../utils/mutations';

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
  Button,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react';

const GoalForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  // state of goal Form
  const [goalState, setGoalState] = useState({ name: '', description: '' });
  // error text state
  const [errorMessage, setError] = useState({ type: '', message: '' });
  const toast = useToast();

  // add Goal mutation setup
  const [addGoal, { error }] = useMutation(ADD_GOAL);

  // update goalState when user adds things in input
  const handleChange = (event) => {
    const { name, value } = event.target;

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
      await addGoal({
        variables: {
          name: name,
          description: description
        }
      });
    } catch (err) {
      console.log(err);
    }

    // reset goalState
    setGoalState({ name: '', description: '' });
    // reset errorMessage
    setError({ type: '', message: '' });

    toast({
      title: 'Goal added!',
      status: 'success',
      duration: 3000,
      isClosable: true
    });

    onClose();
  };

  return (
    // <Box p='3' m='10' borderWidth="2px" w="50%" borderRadius="lg">
    <>
      <Button onClick={onOpen}>Add Goal</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Goal</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody pb={6}>
            <FormControl
              isInvalid={errorMessage.type === 'name' ? true : false}>
              <FormLabel>Name:</FormLabel>
              <Input
                name="name"
                placeholder="What is the goal name?"
                onChange={handleChange}
              />
              {errorMessage.type === 'name' && (
                <FormErrorMessage>{errorMessage.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={errorMessage.type === 'description' ? true : false}>
              <FormLabel>Description:</FormLabel>
              <Input
                name="description"
                id="description"
                type="description"
                placeholder="Write your goal here."
                // value={input}
                onChange={handleChange}
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
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Goal was not added!</AlertTitle>
            </Alert>
          )}
        </ModalContent>
      </Modal>
    </>

    // </Box>
  );
};

export default GoalForm;

// const [description, setText] = useState('');
// const [characterCount, setCharacterCount] = useState(0);

// const [addGoal, { error }] = useMutation(ADD_GOAL, {
//   update(cache, { data: { addGoal } }) {
//     try {
//       // update goal array's cache
//       // could potentially not exist yet, so wrap in a try/catch
//       const { goals } = cache.readQuery({ query: QUERY_USER_GOALS });
//       cache.writeQuery({
//         query: QUERY_USER_GOALS,
//         data: { goals: [addGoal, ...goals] },
//       });
//     } catch (e) {
//       console.error(e);
//     }

//     // update me object's cache
//     const { me } = cache.readQuery({ query: QUERY_ME });
//     cache.writeQuery({
//       query: QUERY_ME,
//       data: { me: { ...me, goals: [...me.goals, addGoal] } },
//     });
//   },
// });

// // update state based on form input changes
// const handleChange = (event) => {
//   if (event.target.value.length <= 280) {
//     setText(event.target.value);
//     setCharacterCount(event.target.value.length);
//   }
// };

// // submit form for adding new goal
// const handleFormSubmit = async (event) => {
//   event.preventDefault();

//   try {
//     await addGoal({
//       variables: { name, description, createdAt },
//     });

//     // clear form value
//     setText('');
//     setCharacterCount(0);
//   } catch (e) {
//     console.error(e);
//   }
// };

// <p
//       className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
//     >
//       Character Count: {characterCount}/280
//       {error && <span>Something went wrong...</span>}
//     </p>

// onSubmit={handleFormSubmit}
