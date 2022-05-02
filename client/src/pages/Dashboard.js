import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Center,
  Flex,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  ScaleFade,
  Button
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import GoalForm from '../components/GoalForm';
import { ActivityDash } from '../components/ActivityList';
import GoalList from '../components/GoalList';
import { COMPLETE_GOAL } from '../utils/mutations';

const Dashboard = () => {
  const navigate = useNavigate();
  // query me
  const { loading, error, data: userData } = useQuery(QUERY_ME);

  // complete goal mutation
  const [completeGoal] = useMutation(COMPLETE_GOAL);

  const user = userData?.me;

  console.log(user);

  const handleViewCompletedGoals = () => {
    navigate('/completed-goals');
  };

  if (error) {
    return (
      <ScaleFade in="true">
        <Box pl="15px" pr="15px" pt="150px" pb="300px">
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="300px"
            borderRadius="md">
            <AlertIcon boxSize="50px" />
            <AlertTitle mt="20px" mb="35px" fontSize="5xl">
              User login Required
            </AlertTitle>
            <AlertDescription fontSize="large">
              You are not logged in. Please log in to view your dashboard!
            </AlertDescription>
          </Alert>
        </Box>
      </ScaleFade>
    );
  }

  if (loading) {
    return <div>Loading your dashboard...</div>;
  }

  return (
    <div>
      <Flex>
        <Box borderWidth="2px" w="50%" h="80%" borderRadius="lg" bg="#FFFFFF">
          <Heading
            className="center-text"
            fontSize="3xl"
            color="#2C7A7B"
            mt="20px">
            My Activities
          </Heading>
          {user.activities.length === 0 ? (
            <Box m="30px">
              <Alert
                status="info"
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                borderRadius="md"
                height="200px">
                <AlertIcon boxSize="40px" mr={0} />
                <AlertTitle mt={4} mb={1} fontSize="lg">
                  No activities yet!
                </AlertTitle>
                <AlertDescription maxWidth="sm">
                  Go to the{' '}
                  <i>
                    <Link to="/">homepage</Link>
                  </i>{' '}
                  to view and add activities.
                </AlertDescription>
              </Alert>
            </Box>
          ) : (
            <Box templateColumns="repeat(5, 1fr)" gap={6}>
              {user.activities.map((activity) => {
                return (
                  <ActivityDash
                    key={activity._id}
                    activity={activity}></ActivityDash>
                );
              })}
            </Box>
          )}
        </Box>
        <Box borderWidth="2px" w="50%" borderRadius="lg">
          <Heading
            className="center-text"
            fontSize="3xl"
            color="#2C7A7B"
            mt="20px">
            My Goals
          </Heading>
          <Center>
            <GoalForm />
          </Center>

          {user.goals.length === 0 ? (
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
            user.goals.map((goal) => {
              return (
                <GoalList
                  key={goal._id}
                  goal={goal}
                  completeGoal={completeGoal}
                />
              );
            })
          )}
          <Button onClick={handleViewCompletedGoals}>
            View Completed Goals
          </Button>
        </Box>
      </Flex>
    </div>
  );
};

export default Dashboard;
