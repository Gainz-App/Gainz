import React from 'react';

const ExerciseCreator = () => {
  console.log('exercise creator');
  return (
    <div>
    <form>
      <p>Enter Exercise Name:</p>
      <input 
        type="text"
        name="name"
        value=""
      />
      <p>Choose Exercise Type:</p>
      <select name="exerciseType">
        <option key="arms" />
        <option key="legs" />
        <option key="core" />
        <option key="upperBody" />
        <option key="lowerBody" />
        <option key="back" />
      </select>
      <p>Enter Exercise Description</p>
      <input type="text" name="description" value="" />
      <p>Enter Exercise Ideal Weight</p>
      <input type="text" name="reps" value="" />
      <p>Enter Exercise Idea Sets</p>
      <input type="text" name="sets" value="" />
      <p>Enter Exercise Idea Reps</p>
      <input type="text" name="reps" value="" />
      <p>Enter Exercise Idea Rest</p>
      <button onClick={handleSubmitClick}>Submit </button>
      <button onClick={handleCancelClick}>Cancel </button>
    </form>
    <button>Create An Exercise</button>
    </div>
  );
};

export default ExerciseCreator;
