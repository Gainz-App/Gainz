import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Button, Form } from 'react-bootstrap';

const ExercisesDisplay = ({ userInfo }) => {
  console.log('this is the exercise display speaking: ', userInfo);
  const [exerciseData, setExerciseData] = useState([]);
  const [curExerciseData, setCurExerciseData] = useState([]);

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
        setCurExerciseData(exercises);
      })
      .catch((error) => {
        console.log('error on ExercisesDisplay', error);
      });
  }, []);

  return (
    <div id="historyDisplay">
      <h1 className="pageMainText">Pick an exercise:</h1>
      <Form.Select
        id="exerciseSelector"
        onChange={(e) => {
          if (e.target.value === "0") {
            setCurExerciseData(exerciseData);
            return;
          }
          setCurExerciseData(exerciseData.filter((exercise) => {
            if (exercise.type_id === e.target.value) {
              return true;
            }
            return false;
          }));
        }}
        name="exerciseType"
        required
      >
        <option value="0" selected default>All Exercises</option>
        <option value="1">Arms</option>
        <option value="2">Legs</option>
        <option value="3">Core</option>
        <option value="4">Upper Body</option>
        <option value="5">Calisthenics</option>
        <option value="6">Back</option>
      </Form.Select>

      <div id="carouselDiv" className="centeredContainer">
        <Carousel>
          {curExerciseData.map((exercise) => (
            <Carousel.Item>
              <div className="exerciseCard" key={exercise._id}>
                <div className="cardBody">
                  <div className="exerciseName"><h2>{exercise.typesname}</h2></div>
                  <div className="exerciseType"><h3>{exercise.name}</h3></div>
                  <img src={`../assets/image${exercise.type_id}.png`}></img>
                  <Link to={`/drill/${exercise._id}`}>
                    <Button id="drillButton" type="button">Start Drill</Button>
                  </Link>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ExercisesDisplay;
