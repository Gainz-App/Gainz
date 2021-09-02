import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

const ExercisesDisplay = ({ userInfo }) => {
  console.log('this is the exercise display speaking: ', userInfo);
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    console.log('Getting data from server');
    // getExercises();
    fetch('/api/', {
      method: 'get',
      headers: {
        user_id: userInfo.id,
      },
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
      <Carousel>
        {exerciseData.map((exercise) => (
          <Carousel.Item>
            <div className="exerciseCard" key={exercise._id}>
              <div className="cardBody">
                <div className="exerciseName"><h2>{exercise.name}</h2></div>
                <div className="exerciseType"><h3>{exercise.typesname}</h3></div>
                <div className="exerciseDescription"><p>{exercise.description}</p></div>
                <Link to={`/drill/${exercise._id}`}>
                  <button type="button">Start Drill</button>
                </Link>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ExercisesDisplay;
