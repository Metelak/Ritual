import React from 'react';
import { ActivityHome } from '../components/ActivityList/';
import { useQuery } from '@apollo/client';
import { QUERY_ACTIVITIES } from '../utils/queries';
import { Wrap } from '@chakra-ui/react';

const Home = () => {
  // import all activities from the db
  const { loading, data: activityData } = useQuery(QUERY_ACTIVITIES);

  if (loading) {
    return <div>loading Activities...</div>;
  }

  return (
    // <Grid templateColumns='repeat(5, 1fr)' gap={6}>
    <Wrap spacing='5px' justify='center'>
      {activityData.activities.map((activity) => {
        return (
          <ActivityHome key={activity.title} activity={activity}></ActivityHome>
        );
      })}
    </Wrap>
    // </Grid>
  );
};

export default Home;
