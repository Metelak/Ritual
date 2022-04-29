import React from 'react';
import { ActivityHome } from '../components/ActivityList';

const sampleActivities = [
  {
    title: 'Walk Outside',
    text: 'Go for a walk outside.',
    image: 'lotus-logo-white.png'
  },
  {
    title: 'Title2',
    text: 'Text2',
    image: 'lotus-logo-white.png'
  }
];

const Home = () => {
  return (
    <div>
      {sampleActivities.map((activity) => {
        return <ActivityHome activity={activity}></ActivityHome>;
      })}
    </div>
  );
};

export default Home;
