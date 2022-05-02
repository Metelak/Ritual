import { Box, ButtonGroup, Center, Text } from '@chakra-ui/react';
import React from 'react';
import { ChallengeForm } from '../ChallengeForm';
import { ReflectionForm } from '../ReflectionForm';

const GoalList = ({ goal }) => {
  // destructure props
  const { _id, name, description, createdAt, challenges, reflection } = goal;

  return (
    <Box margin={10}>
      <Box key={name} border="2px" p={3} m={2} borderRadius="md">
        <Text fontSize="2xl">{name}</Text>
        <div>{description}</div>
        <div>created at: {createdAt}</div>
        <div>{challenges.length} challenges</div>
        <div>{reflection.length} reflection</div>
        <Center>
          <ButtonGroup size="md" isAttached variant="outline">
            <ChallengeForm goalId={_id} />
            <ReflectionForm goalId={_id} />
          </ButtonGroup>
        </Center>
      </Box>
    </Box>
  );
};

export default GoalList;
