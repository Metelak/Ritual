import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REUSE_GOAL } from '../utils/mutations';
import GoalList from '../components/GoalList';
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Heading,
  Center,
  Button,
  ScaleFade
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
const CompletedGoals = () => {
  const [reuseGoal] = useMutation(REUSE_GOAL);

  const { data: userData, loading } = useQuery(QUERY_ME);

  const allGoals = userData?.me.goals;

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
    <Box minHeight="83.3vh">
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
        <ScaleFade in>
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
                No goals!
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Go back to the dashboard to create new goals.
              </AlertDescription>
            </Alert>
          </Box>
        </ScaleFade>
      ) : (
        completedGoals.map((goal) => {
          return (
            <Box key={goal._id} ml="20" mr="20" mb="15">
              <GoalList
                goal={goal}
                completed={true}
                reuseGoal={reuseGoal}></GoalList>
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default CompletedGoals;
