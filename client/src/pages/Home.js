import React from 'react';
import { ActivityHome } from '../components/ActivityList';
import { useQuery } from '@apollo/client';
import { QUERY_ACTIVITIES } from '../utils/queries';

const Home = () => {
  // import all activities from the db
  const { loading, data: activityData } = useQuery(QUERY_ACTIVITIES);

  if (loading) {
    return <div>loading Activities...</div>;
  }

  return (
    <div>
      {activityData.activities.map((activity) => {
        return (
          <ActivityHome key={activity.title} activity={activity}></ActivityHome>
        );
      })}
    </div>
  );
};

export default Home;
