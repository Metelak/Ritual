import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_GOAL } from '../../utils/mutations';
import { QUERY_ME, QUERY_USER_GOALS } from '../../utils/queries';

const GoalForm = () => {
  const [description, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addGoal, { error }] = useMutation(ADD_GOAL, {
    update(cache, { data: { addGoal } }) {
      try {
        // update goal array's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { goals } = cache.readQuery({ query: QUERY_USER_GOALS });
        cache.writeQuery({
          query: QUERY_USER_GOALS,
          data: { goals: [addGoal, ...goals] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, goals: [...me.goals, addGoal] } },
      });
    },
  });

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form for adding new goal
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addGoal({
        variables: { name, description, createdAt },
      });

      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/280
        {error && <span>Something went wrong...</span>}
      </p>
      <form
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Goal Name Here"
          value={name}
          onChange={handleChange}
        ></textarea>
        <textarea
          placeholder="What goal do I have today?"
          value={description}
          onChange={handleChange}
        ></textarea>
        <button>
          Create Goal
        </button>
      </form>
    </div>
  );
  };
  
  export default GoalForm;