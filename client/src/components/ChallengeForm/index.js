import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  useDisclosure,
  ModalHeader,
  Textarea,
  Progress,
  FormErrorMessage,
  useToast,
  IconButton
} from '@chakra-ui/react';

import { useMutation } from '@apollo/client';
import { ADD_CHALLENGE } from '../../utils/mutations';
import { AddIcon } from '@chakra-ui/icons';

export const ChallengeForm = ({ goalId }) => {
  const [challengeState, setChallengeState] = useState('');

  const [descriptionLength, setDescriptionLength] = useState(0);
  const [errorText, setErrorText] = useState('');

  const toast = useToast();

  // add challenge mutation setup
  const [addChallenge, { error }] = useMutation(ADD_CHALLENGE);

  // styling components
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px)"
    />
  );

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  // on form change
  const changeHandler = (event) => {
    const { value } = event.target;

    // update progress bar
    let progressLength = (value.length / 280) * 100;
    setDescriptionLength(progressLength);

    // add input to challengeState
    setChallengeState(value);
  };

  // on form submit
  const submitHandler = async () => {
    // validate description
    if (!challengeState) {
      setErrorText('Please describe your challenge');
      return;
    }

    // validate length
    if (challengeState.length > 280) {
      setErrorText('The description cannot be over 280 characters');
      return;
    }

    // add challengeState to mutation
    try {
      await addChallenge({
        variables: { challengeText: challengeState, goalId: goalId }
      });

      // reset challengeState
      setChallengeState('');
      // reset errorText
      setErrorText('');

      toast({
        title: 'Challenge added!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });

      onClose();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error!',
        description: 'Challenge was not added',
        status: 'error',
        duration: 3000,
        isClosable: true, 
        position: 'top-right'
      });
    }
  };

  return (
    <>
      <IconButton
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
        icon={<AddIcon />}
        colorScheme="red"></IconButton>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Add Challenge</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errorText ? true : false}>
              <FormLabel>Description:</FormLabel>
              <Textarea
                ref={initialRef}
                name="challenges"
                placeholder="Please write about a challenge you found associated with this goal."
                resize="none"
                value={challengeState}
                onChange={changeHandler}
              />
              <Progress
                colorScheme={descriptionLength >= 100 ? 'red' : 'green'}
                size="sm"
                value={descriptionLength}
              />
              {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              colorScheme="teal"
              type="submit"
              onClick={submitHandler}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
