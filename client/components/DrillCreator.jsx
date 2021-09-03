
import React, { useState, useEffect } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import { Form, Button, FloatingLabel } from 'react-bootstrap';


const DrillCreator = ({ userInfo }) => {
  const { id } = useParams();
  const [drillData, setDrillData] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [formVals, setFormVals] = useState({
    exercise_id: id,
    weight: '',
    sets: '',
    reps: '',
    rest_interval: '',
  });

  // Helper function to update state formVals on form change
  const updateFormVal = (key, val) => {
    setFormVals({ ...formVals, [key]: val });
  };

  // TODO MAKE REAL API CALL OR LIFT STATE TO APP
  // Is there a route for creating a drill? I only see createExercise
  const getExercise = () => {
    fetch(`/api/exercise/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } 
        throw new Error('Error when trying to get exercise details');
      })
      .then((data) => {
        console.log('exercise drill data is', data);
        setDrillData(data);
      })
      .catch((error) => console.error(error));
  };

  // Get exercise data for drill info (CURRENTLY FAKE DATA)
  useEffect(() => {
    console.log('Getting data from server for drill');
    getExercise();
  }, []);

  //convert exercise type_id to name
  const pairs = {
    '1': 'Arms', 
    '2': 'Legs', 
    '3': 'Core', 
    '4': 'Upper Body', 
    '5': 'Lower Body', 
    '6': 'Back'
  }
  let type_name = pairs[drillData.type_id];


  // Function to submit drill form data to server, create new drill
  const createDrill = () => {
    console.log('trying to create new drill', formVals);

    fetch('/api/drill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        name: drillData.name, 
        type: type_name, 
        user_id: userInfo.id
      },
      body: JSON.stringify(formVals),
    })
      .then((response) => {
        console.log('drill create response', response.status);
        if (response.status === 201) {
          return response.json();
        }
        throw new Error('error when trying to create a drill');
      })
      .then((data) => {
        console.log('response is 201, data is', data);
        setRedirect(true);
      })
      .catch((error) => console.error(error));
  };

  const { weight, sets, reps, rest_interval } = formVals;

  // Redirect to home page if drill created successfully
  if (redirect === true) {
    return <Redirect to="/" />;
  }  

  return (
    <div className="drillCreatorContainer">
      
    <h3 className="pageMainText">Create drill:</h3>
    <div id="drill2Container"> 
    <div id="drillInfo">
    <p>
      <span>Exercise Name: </span>
      {drillData.name}
    </p>
    <p>
      <span>Exercise Type: </span>
      {type_name}
    </p>
    <p>
      <span>Last Weight (LBs): </span>
      {drillData.last_weight}
    </p>
    <p>
      <span>Last Reps: </span>
      {drillData.last_reps}
    </p>
    <p>
      <span>Last Sets: </span>
      {drillData.last_sets}
    </p>
    <p>
      <span>Last Rest (Mins): </span>
      {drillData.last_rest}
    </p>
    </div>
  <Form
  id="drillCreatorForm"
    onSubmit={(e) => {
    e.preventDefault();
    createDrill();
    }}
        >
          <Form.Group className="drillWeight" controlId="drillWeight">
            {/* <Form.Label>Exercise name:</Form.Label> */}
            <FloatingLabel
              controlId="floatingToday"
              label="Today's weight (in LBs):"
              className="floatToday"
              >
            <Form.Control
              className="drillInput"
              id="drillWeight"
              type="number"
              name="weight"
              value={weight}
              onChange={(e) => {
                console.log('Updated formVals in DrillCreator: ', e.target.value);
                updateFormVal('weight', e.target.value);
              }}
              min={1}
              required
            />
             </FloatingLabel>
          </Form.Group>
          
          
            <Form.Group className="drillSets" controlId="drillSets">
            {/* <Form.Label>Starting weight (in LBs):</Form.Label> */}
            <FloatingLabel
              controlId="floatingDrills"
              label="Today's sets:"
              className="floatDrills"
              >
            <Form.Control
              className="drillInput"
              id="drillSets"
              type="number"
              name="sets"
              value={sets}
              onChange={(e) => {
                console.log('updated formVals in DrillCreator', e.target.value);
                updateFormVal('sets', e.target.value);
              }}
              min={1}
              required
            />
             </FloatingLabel>
          </Form.Group>
  
          <Form.Group className="drillReps" controlId="drillReps">
            {/* <Form.Label>Starting sets:</Form.Label> */}
            <FloatingLabel
              controlId="floatingReps"
              label="Today's reps:"
              className="floatReps"
              >
            <Form.Control
              className="drillInput"
              id="drillReps"
              type="number"
              name="reps"
              value={reps}
              onChange={(e) => {
                console.log('updated formVals in DrillCreator', e.target.value);
                updateFormVal('reps', e.target.value);
              }}
              min={1}
              required
            />
            </FloatingLabel>
          </Form.Group>
  
          <Form.Group className="drillRest" controlId="drillRest">
            {/* <Form.Label>Starting reps:</Form.Label> */}
            <FloatingLabel
              controlId="floatingRest"
              label="Today's rest time"
              className="floatRest"
              >
            <Form.Control
              className="drillInput"
              id="drillRest"
              type="number"
              name="rest"
              value={rest_interval}
              onChange={(e) => {
                console.log('updated formVals in DrillCreator', e.target.value);
                updateFormVal('rest_interval', e.target.value);
              }}
              min={1}
              required
            />
              </FloatingLabel>
          </Form.Group>
            <div className="exerciseButtonDiv"></div>
        <Button
            className="exerciseButton asdf"
            variant="primary"
            type="submit">
            Submit drill
          </Button>
  
          <Link to="/">
          <Button
          className="exerciseButton"
          type="button"
          >
        Cancel
          </Button>
        </Link>
        </Form>
    </div>
  </div>
  );
};

export default DrillCreator;
