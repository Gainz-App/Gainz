import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ExercisesDisplay = ({ userInfo }) => {
  console.log('this is the exercise display speaking: ', userInfo)
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    console.log('Getting data from server');
    // getExercises();
    fetch('/api/', {
      method: 'get', 
      headers: {
        user_id: userInfo.id
      }
    })
      .then((res) => res.json())
      .then((exercises) => {
        console.log('exercises are', exercises);
        setExerciseData(exercises);
      })
      .catch((error) => {
        console.log('error on ExercisesDisplay', error);
      });
  }, []);

  return (
    <div>
      <h1>Pick an Exercise:</h1>
      {exerciseData.sort((a, b) => {
        return (Number(a.type_id) < Number(b.type_id)) ? -1 : 1}).map((exercise) => {
        console.log('makes all data exercises');
        return (
          <div class="exercise" key={exercise.name} className="exercise">
            <h2>{exercise.name}</h2>
            <h3>Type: {exercise.typesname}</h3>
            {/* <h3>Description: {exercise.description}</h3> */}
            <Link to={`/drill/${exercise._id}`}>
              <button>Start Drill</button>
            </Link>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default ExercisesDisplay;
