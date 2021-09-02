import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
 
// React element allowing users to create a new exercise via form
const ExerciseCreator = ({ userInfo }) => {
  console.log('this is the exerciseCreator speaking: ', userInfo)
  let history = useHistory();

  const [redirect, setRedirect] = useState(false);
  const [formVals, setFormVals] = useState({
    name: '',
    // description: '',
    type_id: '1',
    init_weight: '',
    init_reps: '',
    init_sets: '',
    init_rest: '',
  });

  // Helper function to update state formVals on form change
  const updateFormVal = (key, val) => {
    setFormVals({ ...formVals, [key]: val });
  };

  // Function to submit new exercise form data to server for processing
  const createExercise = () => {
    console.log('Trying to create exercise: ', formVals);
    fetch('/api/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        user_id: userInfo.id
      },
      body: JSON.stringify(formVals),
    })
      .then((response) => {
        // If creation successful, redirect to exercises
        console.log('CREATE RESPONSE: ', response.status);
        if (response.status === 201) {
          return response.json();
        }
        throw new Error('Error when trying to login a user!');
      }).then((data) => {
        console.log('Added new exercise: ', data);
        history.push('/');
      })
      .catch((err) => console.error(err));
  };

  const {
    name, description, type, init_weight, init_reps, init_sets, init_rest,
  } = formVals;

  // If successfully created new exercise, redirect to '/' route:
  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <section>
        <h3>Create a new exercise:</h3>
  
  <Form
    onSubmit={(e) => {
    e.preventDefault();
    createExercise();
    }}
        >
          <Form.Group className="exerciseName" controlId="exerciseName">
            <Form.Label>Exercise name:</Form.Label>
            <Form.Control
               type="text"
               placeholder="Exercise Name"
               onChange={(e) => {
                 console.log('Updated createEx formVals: ', e.target.value);
                 updateFormVal('name', e.target.value);
               }}
               value={name}
               name="name"
               required
             />
          </Form.Group>
          
          <Form.Group className="exerciseType" controlId="exerciseType"> 
     
            <Form.Select aria-label="Exercise type:" id="exerciseType"
              onChange={(e) => {
                console.log('Updated createEx formVals: ', e.target.value);
                updateFormVal('type_id', e.target.value);
              }}
              name="exerciseType"
              required
            >
              <option value="1" selected>Arms</option>
              <option value="2">Legs</option>
              <option value="3">Core</option>
              <option value="4">Upper Body</option>
              <option value="5">Lower Body</option>
              <option value="6">Back</option>
            </Form.Select>
          </Form.Group>
  
  
          <Form.Group className="exerciseWeight" controlId="exerciseWeight">
            <Form.Label>Starting weight (in LBs):</Form.Label>
            <Form.Control
               
               type="number"
               onChange={(e) => {
                 console.log('Updated createEx formVals: ', e.target.value);
                 updateFormVal('init_weight', e.target.value);
               }}
               value={init_weight}
               name="weight"
               min={1}
             />
          </Form.Group>
  
          <Form.Group className="exerciseSets" controlId="exerciseSets">
            <Form.Label>Starting sets:</Form.Label>
            <Form.Control
                 
                 type="number"
                 onChange={(e) => {
                   console.log('Updated createEx formVals: ', e.target.value);
                   updateFormVal('init_sets', e.target.value);
                 }}
                 value={init_sets}
                 name="sets"
                 min={1}
               />
          </Form.Group>
  
          <Form.Group className="exerciseReps" controlId="exerciseReps">
            <Form.Label>Starting reps:</Form.Label>
            <Form.Control
                
                type="number"
                onChange={(e) => {
                  console.log('Updated createEx formVals: ', e.target.value);
                  updateFormVal('init_reps', e.target.value);
                }}
                value={init_reps}
                name="reps"
                min={1}
              />
          </Form.Group>
  
          <Form.Group className="exerciseRest" controlId="exerciseRest">
            <Form.Label>Starting rest time:</Form.Label>
            <Form.Control
                type="number"
                onChange={(e) => {
                  console.log('Updated createEx formVals: ', e.target.value);
                  updateFormVal('init_rest', e.target.value);
                }}
                value={init_rest}
                name="rest"
                min={1}
              />
              <br />
          </Form.Group>
  
          <Button
            variant="primary"
            type="submit">
            Create exercise
          </Button>
  
          <Link to="/">
          <Button
          type="button"
          >
        Cancel
          </Button>
        </Link>
        </Form>
  </section>
  )
              };

export default ExerciseCreator;

