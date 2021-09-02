import React, { useState, useEffect } from 'react';

const HistoryDisplay = () => {
  const [history, setHistory] = useState([]);
  // const [curExerciseData, setCurExerciseData] = useState([]);

  const getHistory = () => {
    fetch('/api/history')
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error ('Error getting history from server.');
      })
      .then((data) => {
        console.log('Our getHistory data is:', data);
        setHistory(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    console.log('GETTING HISTROY FROM SERVER');
    getHistory();
  }, []);

  const drills = history.map((drill, i) => {
    return (
      
      <div key={drill._id}>
        <div>Date: {drill.date}</div>
        <div>
          <div>{drill.type_name}</div>
          <div>{drill.weight} lbs.</div>
          <div>{drill.sets} Sets</div>
        </div>
        <div>
          <div>{drill.name}</div>
          <div>{drill.rest_interval}min intervals</div>
          <div>{drill.reps} Reps</div>         
        </div>
      </div> )
  });

  return(
    <div>
      <h1>Gainz History:</h1>
      <ul>
        {drills}
      </ul>
    </div>
  );
};

export default HistoryDisplay;
