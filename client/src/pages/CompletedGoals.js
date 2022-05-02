import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import GoalList from '../components/GoalList';
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Heading,
  Center,
  Button
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
const CompletedGoals = () => {
  const { data: userData, loading } = useQuery(QUERY_ME);

  const allGoals = userData?.me.goals;

  console.log(userData);

  if (loading) {
    return <div>Loading your goals...</div>;
  }

  let completedGoals;
  if (allGoals) {
    completedGoals = allGoals.filter((goal) => {
      return goal.isComplete === true;
    });
  }

  return (
    <Box>
      <Heading className="center-text" fontSize="3xl" color="#2C7A7B" mt="20px">
        Completed Goals
      </Heading>
      <Center>
        <Link to="/dashboard">
          <Button leftIcon={<ArrowBackIcon />} variant="ghost">
            Back to dashboard
          </Button>
        </Link>
      </Center>
      {!completedGoals.length ? (
        <Box m="30px">
          <Alert
            status="info"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            borderRadius="md">
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              No goals yet!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Click Add Goal to create a goal.
            </AlertDescription>
          </Alert>
        </Box>
      ) : (
        completedGoals.map((goal) => {
          return (
            <GoalList goal={goal} completed={true} key={goal._id}></GoalList>
          );
        })
      )}
    </Box>
  );
};

export default CompletedGoals;
