import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_CHALLENGE, ADD_REFLECTION } from '../../utils/mutations';
import { QUERY_GOAL, QUERY_USER_CHALLENGES, QUERY_USER_REFLECTIONS } from '../../utils/queries';

const ChallengeReflectionForm = () => {
  const [challengeText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addChallenge, { error }] = useMutation(ADD_CHALLENGE, {
    update(cache, { data: { addChallenge } }) {
      try {
        const { challenges } = cache.readQuery({ query: QUERY_USER_CHALLENGES });
        cache.writeQuery({
          query: QUERY_USER_CHALLENGES,
          data: { challenges: [addChallenge, ...challenges] },
        });
      } catch (e) {
        console.error(e);
      }

      const { goal } = cache.readQuery({ query: QUERY_GOAL });
      cache.writeQuery({
        query: QUERY_GOAL,
        data: { goal: { ...goal, challenges: [...goal.challenges, addChallenge] } },
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
      await addChallenge({
        variables: { challengeText },
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
          placeholder="What did I find challenging about this goal?"
          value={challengeText}
          onChange={handleChange}
        ></textarea>
        <textarea
          placeholder="Reflect on this goal"
          value={reflectionText}
          onChange={handleChange}
        ></textarea>
        <button>
          Submit
        </button>
      </form>
    </div>
  );
  };
  
  export default ChallengeReflectionForm;