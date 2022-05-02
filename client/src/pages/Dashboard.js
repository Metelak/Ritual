import React from 'react';
import {
  Box,
  Center,
  Flex,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  ScaleFade
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import GoalForm from '../components/GoalForm';
import { ActivityDash } from '../components/ActivityList';
import GoalList from '../components/GoalList';

const Dashboard = () => {
  // query me
  const { loading, error, data: userData } = useQuery(QUERY_ME);

  const user = userData?.me;

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
            height="300px">
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
          <Heading className="center-text" fontSize="3xl" color="#2C7A7B">
            My Activities
          </Heading>
          <Box templateColumns="repeat(5, 1fr)" gap={6}>
            {user.activities.map((activity) => {
              return (
                <ActivityDash
                  key={activity._id}
                  activity={activity}></ActivityDash>
              );
            })}
          </Box>
        </Box>
        <Box borderWidth="2px" w="50%" borderRadius="lg">
          <Heading className="center-text" fontSize="3xl" color="#2C7A7B">
            My Goals
          </Heading>
          {user.goals.map((goal) => {
            return <GoalList key={goal._id} goal={goal} />;
          })}
          <Center>
            <GoalForm />
          </Center>
        </Box>
      </Flex>
    </div>
  );
};

export default Dashboard;
