import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  useDisclosure,
  Divider,
  Flex,
  useToast,
  Text,
  Checkbox
} from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import React from 'react';
import { ChallengeForm } from '../ChallengeForm';
import { ReflectionForm } from '../ReflectionForm';
import GoalChallenges from './challenges';
import GoalReflection from './reflection';

// completed (standing for if we're viewing completed goals) is defaulted to false
const GoalList = ({ goal, completeGoal, completed = false, reuseGoal }) => {
  const { _id, name, description, createdAt, challenges, reflection } = goal;

  // use chakraUI's toast
  const toast = useToast();

  // set useDisclosure function to custom names
  const { isOpen: challengeOpen, onToggle: toggleChallenges } = useDisclosure();
  const { isOpen: reflectionOpen, onToggle: toggleReflection } =
    useDisclosure();

  // complete goal was pressed
  const completeGoalHandler = async () => {
    try {
      await completeGoal({
        variables: { id: _id }
      });
      toast({
        title: 'Congrats on completing your goal!',
        description:
          'If you would like to use it again, go to your completed goals',
        status: 'success',
        duration: 6000,
        isClosable: true,
        position: 'top-right'
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error!',
        description: 'We were unable to add your goal to completed goals',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
    }
  };

  // reuse goal was pressed
  const reuseGoalHandler = async () => {
    try {
      await reuseGoal({
        variables: { id: _id }
      });

      toast({
        title: 'Goal restored',
        description:
          'You can now view and interact with this goal in the dashboard',
        status: 'success',
        duration: 6000,
        isClosable: true,
        position: 'top-right'
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error!',
        description: 'We were unable to add this back to your reused goals.',
        status: 'error',
        duration: 6000,
        isClosable: true,
        position: 'top-right'
      });
    }
  };

  return (
    <Box margin="30px">
      <Box
        border="2px"
        p="3"
        borderRadius="md"
        borderColor="gray.200"
        bgColor="teal.50">
        <Flex justifyContent="end" mb="-6">
          {completed ? (
            <Button
              onClick={reuseGoalHandler}
              variant="ghost"
              _hover={{ bg: 'teal.200' }}>
              Reuse Goal
            </Button>
          ) : (
            <Checkbox
              onChange={completeGoalHandler}
              size="lg"
              colorScheme="green"
            >
              Goal Complete
            </Checkbox>
          )}
        </Flex>
        <Heading fontSize="3xl" ml="5" mt="5">
          {name}
        </Heading>
        <Box
          mt="2"
          ml="5"
          mr="5"
          border="2px"
          borderRadius="md"
          borderColor="gray.400"
          minHeight="20"
          boxShadow="lg"
          bgColor="teal.100">
          <Text m="2">{description}</Text>
          <Flex justifyContent="end">
            <Text m="2">{createdAt}</Text>
          </Flex>
        </Box>
        <Flex mt="10" height="40px" flexDir="row" justifyContent="space-evenly">
          <Box>
            {completed ? (
              <Button
                onClick={toggleChallenges}
                isDisabled={challenges.length === 0 ? true : false}
                colorScheme="red"
                icon={<ArrowDownIcon />}>
                Challenges
                {challenges.length === 0 ? '' : `(${challenges.length})`}
              </Button>
            ) : (
              <ButtonGroup isAttached>
                <Button
                  onClick={toggleChallenges}
                  colorScheme="red"
                  icon={<ArrowDownIcon />}>
                  Challenges
                  {challenges.length === 0 ? '' : `(${challenges.length})`}
                </Button>
                <ChallengeForm goalId={_id} />
              </ButtonGroup>
            )}
          </Box>
          <Divider orientation="vertical" />
          <Box>
            {completed ? (
              <Button
                isDisabled={reflection.length === 0 ? true : false}
                onClick={toggleReflection}
                colorScheme="teal"
                icon={<ArrowDownIcon />}>
                Reflection
                {reflection.length === 0 ? '' : `(${reflection.length})`}
              </Button>
            ) : (
              <ButtonGroup isAttached>
                <Button
                  onClick={toggleReflection}
                  colorScheme="teal"
                  icon={<ArrowDownIcon />}>
                  Reflection
                  {reflection.length === 0 ? '' : `(${reflection.length})`}
                </Button>
                <ReflectionForm goalId={_id} />
              </ButtonGroup>
            )}
          </Box>
        </Flex>
      </Box>

      {/* Pop-down for challenges */}
      <GoalChallenges
        challengeOpen={challengeOpen}
        challenges={challenges}
        toggleChallenges={toggleChallenges}
        goalName={name}
      />

      {/* Pop-down for reflections */}
      <GoalReflection
        reflectionOpen={reflectionOpen}
        toggleReflection={toggleReflection}
        reflections={reflection}
        goalName={name}
      />
    </Box>
  );
};

export default GoalList;
