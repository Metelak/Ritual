import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
// import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

// Imports from @chakra-ui/react to assist with Modal and form styling.
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast
} from '@chakra-ui/react';

function LoginForm() {
  // Importing functions from @chakra-ui/react for when Modal isOpn, onOpen, onClose as useDisclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // initialRef is where the cursor loads upon Modal opening for the user
  const initialRef = React.useRef();
  // finalRef is the last input field for user before submit or cancel button
  const finalRef = React.useRef();

  // useToast from Chakra-UI for success message
  const toast = useToast();
  // // import positions for toast
  // const position = ['top-right'];

  // Setting initial form state by using state for already registered users with username and password fields.
  const [formState, setFormState] = useState({ username: '', password: '' });

  // User login using LOGIN_USER mutation
  const [login] = useMutation(LOGIN_USER);

  // NEED TO RE-INCORPORATE vanilla JS for if (err);
  // Defining error so Modal knows on which condition to present error text to user.
  // const isError = error;

  // Any time form input has been added it registers on the page as users type, generating and returning updated form state.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  // Using LOGIN_USER mutation variables plus user token, we can validate when a user has correctly logged in.
  // Otherwise prompt the user to enter their correct credentials or register if they do not have an account.
  const handleFormSubmit = async (formState) => {
    // add login data using mutation
    try {
      const mutationResponse = await login({
        variables: {
          username: formState.username,
          password: formState.password
        }
      });
      const token = mutationResponse.data.login.token;
      // Using Auth.js imported at the top, the user's credentials are verified with their JWT
      Auth.login(token);

      // reset LoginForm state, clearing values in fields username and password
      setFormState({ username: '', password: '' });

      // Toast will display message on successful login
      toast({
        title: 'Success!',
        position: 'top-right',
        description: 'You are now logged in!',
        status: 'success',
        duration: 9000,
        isClosable: true
      });

      // Close modal
      onClose();

    } catch (e) {
      console.log(e);
      // Display error message using toast
      toast({
        title: 'We could not validate your account.',
        position: 'top-right',
        description:
          'Please re-enter your credentials, or sign up to create a new account.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
      // Leave modal open for user to re-try login credentials
    }
  };

  // Create a password input with a show/hide password functionality
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  // function LoginForm() will generate the following Modal
  return (
    <>
      <Button onClick={onOpen}>Login</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome Back!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                ref={initialRef}
                name="username"
                className="username-input"
                placeholder="username"
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
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleFormSubmit} colorScheme="blue" mr={3}>
              Enter
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default LoginForm;
