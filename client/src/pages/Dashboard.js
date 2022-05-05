import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Center,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  ScaleFade,
  Button,
  ButtonGroup,
  Divider,
  Stack,
  Flex
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import GoalForm from '../components/GoalForm';
import { ActivityDash } from '../components/ActivityList/';
import GoalList from '../components/GoalList';
import { COMPLETE_GOAL } from '../utils/mutations';

import { useStoreContext } from '../utils/state/UserContext';
import { ADD_GOALS, ADD_ACTIVITIES } from '../utils/state/actions';

const Dashboard = () => {
  const [state, dispatch] = useStoreContext();

  const [userGoals, setGoals] = useState([]);
  const [userActivities, setActivities] = useState([]);

  const navigate = useNavigate();
  // query me
  const { loading, error, data: userData } = useQuery(QUERY_ME);

  // complete goal mutation
  const [completeGoal] = useMutation(COMPLETE_GOAL);

  // destructure global variables
  const { goals, activities } = state;

  // if global store exists for goals and activities, use that
  useEffect(() => {
    if (goals.length) {
      setGoals(
        goals.filter((goal) => {
          return !goal.isComplete;
        })
      );
    }
    if (activities) {
      setActivities(activities);
    }
  }, [goals, activities]);

  // if not, fill global store with user info
  useEffect(() => {
    if (userData) {
      dispatch({
        type: ADD_GOALS,
        goals: userData.me.goals
      });
      dispatch({
        type: ADD_ACTIVITIES,
        activities: userData.me.activities
      });
    }
  }, [userData, dispatch]);

  const handleViewCompletedGoals = () => {
    navigate('/completed-goals');
  };

  if (error) {
    let errorMessage = error.graphQLErrors[0].message;
    return (
      <ScaleFade in>
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
              {errorMessage}!
            </AlertTitle>
            <AlertDescription fontSize="large">
              {errorMessage === 'Not logged in'
                ? `You are not logged in. Please log in to view your dashboard!`
                : null}
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
    <Flex flexDir={['column', 'column', 'row']} alignItems="center">
      <Box w={['80%', '80%', '50%']} minHeight="100%" bg="#FFFFFF">
        <Heading
          className="center-text"
          fontSize="3xl"
          color="#2C7A7B"
          mt="20px">
          My Activities
        </Heading>
        {userActivities.length === 0 ? (
          <ScaleFade in>
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
                  No activities!
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
          </ScaleFade>
        ) : (
          <Box templateColumns="repeat(5, 1fr)" gap={6}>
            {userActivities.map((activity) => {
              return (
                <ActivityDash
                  key={activity._id}
                  activity={activity}></ActivityDash>
              );
            })}
          </Box>
        )}
      </Box>

      <Center>
        <Divider
          orientation="vertical"
          width="1px"
          minHeight="100%"
          variant="solid"
          bg="#234E52"
        />
      </Center>

      <Box w={['80%', '80%', '50%']} minHeight="100%">
        <Heading
          className="center-text"
          fontSize="4xl"
          color="#285E61"
          mt="20px">
          My Goals
        </Heading>
        <Center>
          <ButtonGroup isAttached mt="3">
            <GoalForm />
            <Button
              onClick={handleViewCompletedGoals}
              colorScheme="teal"
              size="md">
              Completed Goals
            </Button>
          </ButtonGroup>
        </Center>
        {userGoals.length === 0 ? (
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
                  Click Add Goal to create a goal.
                </AlertDescription>
              </Alert>
            </Box>
          </ScaleFade>
        ) : (
          userGoals.map((goal) => {
            return (
              <GoalList
                key={goal._id}
                goal={goal}
                completeGoal={completeGoal}
              />
            );
          })
        )}
      </Box>
    </Flex>
  );
};

export default Dashboard;
