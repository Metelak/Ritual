import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { ChallengeReflectionForm } from '../ChallengeReflectionForm';
import { Link } from 'react-router-dom';
import { ChallengeForm } from '../ChallengeForm';

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
        <ChallengeReflectionForm />
        <ChallengeForm goalId={_id}></ChallengeForm>
      </Box>
    </Box>
  );
};

export default GoalList;
