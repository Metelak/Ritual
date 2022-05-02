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
  useToast
} from '@chakra-ui/react';

import { useMutation } from '@apollo/client';
import { ADD_REFLECTION } from '../../utils/mutations';

export const ReflectionForm = ({ goalId }) => {
  const [reflectionState, setReflectionState] = useState('');

  const [descriptionLength, setDescriptionLength] = useState(0);
  const [errorText, setErrorText] = useState('');

  const toast = useToast();

  // add challenge mutation setup
  const [addReflection, { error }] = useMutation(ADD_REFLECTION);

  // styling components
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  // on form change
  const changeHandler = (event) => {
    const { value } = event.target;

    // update progress bar
    let progressLength = (value.length / 280) * 100;
    setDescriptionLength(progressLength);

    // add input to reflectionState
    setReflectionState(value);
  };

  // on form submit
  const submitHandler = async () => {
    // validate description
    if (!reflectionState) {
      setErrorText('Please describe your reflection');
      return;
    }

    // validate length
    if (reflectionState.length > 280) {
      setErrorText('The description cannot be over 280 characters');
      return;
    }

    // add reflectionState to mutation
    try {
      await addReflection({
        variables: { reflectionText: reflectionState, goalId: goalId }
      });

      // reset reflectionState
      setReflectionState('');
      // reset errorText
      setErrorText('');

      toast({
        title: 'Reflection added!',
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
        description: 'Reflection was not added',
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
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
        variant="outline"
        colorScheme="cyan">
        Add Reflection
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Reflection</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errorText ? true : false}>
              <FormLabel>Description</FormLabel>
              <Textarea
                ref={initialRef}
                name="reflection"
                placeholder="Please reflect on this goal."
                resize="none"
                value={reflectionState}
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
