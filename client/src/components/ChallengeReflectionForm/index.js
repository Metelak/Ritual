import React from 'react';
// import { Link } from 'react-router-dom';

// import { useMutation } from '@apollo/client';
// import { ADD_CHALLENGE, ADD_REFLECTION } from '../../utils/mutations';
// import {
//   QUERY_GOAL,
//   QUERY_USER_CHALLENGES,
//   QUERY_USER_REFLECTIONS
// } from '../../utils/queries';
import {
  Button,
  ButtonGroup,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';

const ChallengeReflectionForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const [text, setText] = React.useState('Challenges', 'Reflections');

  return (
    <>
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
            setText('Challenges');
          }}
          mr="-px"
          variant="outline"
          colorScheme="red"
          _active={{ bg: '#FFC0CB' }}>
          Challenges
        </Button>
        <Button onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
            setText('Reflections');
          }} 
          mr="-px" variant="outline" colorScheme="cyan">
          Reflections
        </Button>
      </ButtonGroup>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>{text}</FormLabel>
              <Input placeholder="What challenges did you have with this goal?" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              colorScheme="teal"
              // isLoading={props.isSubmitting}
              type="submit">
              Save to goal
            </Button>
          </ModalFooter>
        </ModalContent>
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>{text}</FormLabel>
              <Input placeholder="Reflect on this goal here." />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              colorScheme="teal"
              // isLoading={props.isSubmitting}
              type="submit">
              Save to goal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { ChallengeReflectionForm };

// const [challengeText, setText] = useState('');
//   const [characterCount, setCharacterCount] = useState(0);

//   const [addChallenge, addReflection, { error }] = useMutation(ADD_CHALLENGE, ADD_REFLECTION, {
//     update(cache, { data: { addChallenge, addReflection } }) {
//       try {
//         const { challenges, reflections } = cache.readQuery({ query: QUERY_USER_CHALLENGES, ADD_USER_REFLECTIONS });
//         cache.writeQuery({
//           query: QUERY_USER_CHALLENGES, QUERY_USER_REFLECTIONS,
//           data: { challenges, reflections: [addChallenge, addReflections, ...challenges, reflections] },
//         });
//       } catch (e) {
//         console.error(e);
//       }

//       const { goal } = cache.readQuery({ query: QUERY_GOAL });
//       cache.writeQuery({
//         query: QUERY_GOAL,
//         data: { goal: { ...goal, challenges, reflections: [...goal.challenges, addChallenge] } },
//       });
//     },
//   });

//   // update state based on form input changes
//   const handleChange = (event) => {
//     if (event.target.value.length <= 280) {
//       setText(event.target.value);
//       setCharacterCount(event.target.value.length);
//     }
//   };

//   // submit form for adding new goal
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       await addChallenge({
//         variables: { challengeText },
//       });
//       await addReflection({
//         variables: { reflectionText },
//       });

//       // clear form value
//       setText('');
//       setCharacterCount(0);
//     } catch (e) {
//       console.error(e);
//     }
//   };

// const ReflectionForm = () => {
//     const [reflectionText, setText] = useState('');
//     const [characterCount, setCharacterCount] = useState(0);

//     const [addReflection, { error }] = useMutation(ADD_REFLECTION, {
//       update(cache, { data: { addReflection } }) {
//         try {
//           const { reflections } = cache.readQuery({ query: QUERY_USER_REFLECTIONS });
//           cache.writeQuery({
//             query: QUERY_USER_REFLECTIONS,
//             data: { reflections: [addReflection, ...reflections] },
//           });
//         } catch (e) {
//           console.error(e);
//         }

//         const { goal } = cache.readQuery({ query: QUERY_GOAL });
//         cache.writeQuery({
//           query: QUERY_GOAL,
//           data: { goal: { ...goal, reflections: [...goal.reflections, addReflection] } },
//         });
//       },
//     });

{
  /* <p
        className={`m-0 ${
          characterCount === 280 || error ? 'text-error' : ''
        }`}>
        Character Count: {characterCount}/280
        {error && <span>Something went wrong...</span>}
      </p> */
}
