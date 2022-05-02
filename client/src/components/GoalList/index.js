import {
  Box,
  Button,
  ButtonGroup,
  Text,
  useDisclosure,
  Divider,
  Flex
} from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import React from 'react';
import { ChallengeForm } from '../ChallengeForm';
import { ReflectionForm } from '../ReflectionForm';
import GoalChallenges from './challenges';
import GoalReflection from './reflection';

const GoalList = ({ goal }) => {
  // destructure props
  const { _id, name, description, createdAt, challenges, reflection } = goal;

  const { isOpen: challengeOpen, onToggle: toggleChallenges } = useDisclosure();
  const { isOpen: reflectionOpen, onToggle: toggleReflection } =
    useDisclosure();

  return (
    <Box margin={10}>
      <Box key={name} border="2px" p={3} m={2} borderRadius="md">
        <Text fontSize="2xl">{name}</Text>
        <div>{description}</div>
        <div>created at: {createdAt}</div>
        <Flex mt="10" height="40px" flexDir="row" justifyContent="space-evenly">
          <Box>
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
          </Box>
          <Divider orientation="vertical" />
          <Box>
            <ButtonGroup isAttached variant="outline">
              <Button
                onClick={toggleReflection}
                colorScheme="teal"
                icon={<ArrowDownIcon />}>
                Reflection
              </Button>
              <ReflectionForm goalId={_id} />
            </ButtonGroup>
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
