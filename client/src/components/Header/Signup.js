import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

// Imports from @chakra-ui/react to assist with Modal and form styling.
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';

function SignupForm() {
  // Importing functions from @chakra-ui/react for when Modal isOpn, onOpen, onClose as useDisclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // initialRef is where the cursor loads upon Modal opening for the user
  const initialRef = React.useRef();
  // finalRef is the last input field for user before submit or cancel button
  const finalRef = React.useRef();

  // Setting form state by using state for already registered users with email and password fields.
  const [formState, setFormState] = useState({ email: '', password: '' });

  // Using mutation addUser to pull necessary registration fields we use in handleFormSubmit()
  const [addUser, { error }] = useMutation(ADD_USER);

  // Defining error so Modal knows on which condition to present error text to user.
  const isError = error;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // The block of code to be tested for errors while the program is being executed is written in the try block
    try {
      const mutationResponse = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password
        }
      });
      // Using Auth.js imported at the top, the user's credentials are verified with their JWT
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (e) {
      // if errors are presented, use catch to console.log(e)
      console.log(e);
    }
  };

  // Any time form input has been added it registers on the page as users type, generating and returning updated form state.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  // Create a password input with a show/hide password functionality
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Button onClick={onOpen}>Sign Up</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                ref={initialRef}
                className="username-input"
                placeholder="username"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input
                className="email-input"
                placeholder="email"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  className="password-input"
                  placeholder="******"
                  name="password"
                  type={show ? 'text' : 'password'}
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!isError ? (
                <FormHelperText> </FormHelperText>
              ) : (
                <FormErrorMessage>User credentials required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onSubmit={handleFormSubmit} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SignupForm;