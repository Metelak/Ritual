import {
  Box,
  Button,
  ButtonGroup,
  Text,
  useDisclosure,
  Divider,
  Flex,
  useToast
} from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import React from 'react';
import { ChallengeForm } from '../ChallengeForm';
import { ReflectionForm } from '../ReflectionForm';
import GoalChallenges from './challenges';
import GoalReflection from './reflection';

const GoalList = ({ goal, completeGoal, completed = false, reuseGoal }) => {
  const { _id, name, description, createdAt, challenges, reflection } = goal;

  const toast = useToast();

  const { isOpen: challengeOpen, onToggle: toggleChallenges } = useDisclosure();
  const { isOpen: reflectionOpen, onToggle: toggleReflection } =
    useDisclosure();

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
        duration: 3000,
        isClosable: true,
        position: 'top-right'
      });
    } catch (err) {
      console.log(err);
      toast({
        title: 'Error!',
        description: '',
        status: 'error',
        duration: 6000,
        isClosable: true,
        position: 'top-right'
      });
    }
  };

  const reuseGoalHandler = async () => {
    try {
      await reuseGoal({
        variables: { id: _id }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box margin={10}>
      <Box border="2px" p={3} m={2} borderRadius="md">
        <Text fontSize="2xl">{name}</Text>
        <div>{description}</div>
        <div>created at: {createdAt}</div>
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
              <ButtonGroup isAttached variant="outline">
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
              <ButtonGroup isAttached variant="outline">
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
        {completed ? (
          <Button onClick={reuseGoalHandler}>Reuse Goal</Button>
        ) : (
          <Button onClick={completeGoalHandler}>Complete Goal</Button>
        )}
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
