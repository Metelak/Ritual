import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import GoalForm from '../components/GoalForm'
import { ChallengeReflectionForm } from '../components/ChallengeReflectionForm';

const Dashboard = () => {
  return (
    <div>
      <Flex>
        <Box borderWidth="2px" w="50%" borderRadius="lg">
          My Activities
        </Box>
        <Box borderWidth="2px" w="50%" borderRadius="lg">
          My Goals
          <GoalForm></GoalForm>
          <ChallengeReflectionForm></ChallengeReflectionForm>
        </Box>
      </Flex>
    </div>
  );
};

export default Dashboard;
