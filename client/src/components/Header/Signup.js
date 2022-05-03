import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';

// Imports from @chakra-ui/react to assist with Modal and form styling.
import {
  Button,
  FormControl,
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
  useDisclosure,
  useToast
} from '@chakra-ui/react';

function SignupForm() {
  // Importing functions from @chakra-ui/react for when Modal isOpn, onOpen, onClose as useDisclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // useNavigate to redirect user after signup to Dashboard
  const navigate = useNavigate();

  // useToast from Chakra-UI for success message
  const toast = useToast();

  // initialRef is where the cursor loads upon Modal opening for the user
  const initialRef = React.useRef();
  // finalRef is the last input field for user before submit or cancel button
  const finalRef = React.useRef();

  // Setting form state by using state for already registered users with email and password fields.
  const [formState, setFormState] = useState({ email: '', password: '' });

  // Using mutation addUser to pull necessary registration fields we use in handleFormSubmit()
  const [addUser] = useMutation(ADD_USER);

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

    // reset SignupForm
    setFormState({ email: '', password: '' });

    toast({
      title: 'Account created.',
      position: 'top-right',
      description: "We've created your account for you.",
      status: 'success',
      duration: 9000,
      isClosable: true
    });

    // Close modal
    onClose();

    // Redirect user to dashboard view
    navigate('/dashboard', { replace: true });
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

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px)"
    />
  );

  const [overlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Button color='#FFFFFF' variant="ghost" _hover={{ bg: 'teal.300' }} onClick={onOpen}>
        Sign Up
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
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

            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input
                name="email"
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
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleFormSubmit} colorScheme="teal" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SignupForm;
