import React, { useState, useEffect } from 'react';

const HistoryDisplay = ({ userInfo }) => {
  const [history, setHistory] = useState([]);
  // const [curExerciseData, setCurExerciseData] = useState([]);

  const getHistory = () => {
    fetch('/api/history', {
      method: 'get', 
      headers: {
        user_id: userInfo.id
      }
    })
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
    const drillDate = new Date(drill.date).toDateString();

    return (
      
      <div className="drillContainer" key={drill._id}>
        <div className="drillFirstRow drillRow">Date: {drillDate}</div>
        <div className="drillSecondRow drillRow">
          <div>{drill.type_name}</div>
          <div>{drill.weight} lbs.</div>
          <div>{drill.sets} Sets</div>
        </div>
        <div className="drillThirdRow drillRow">
          <div>{drill.name}</div>
          <div>{drill.rest_interval}min intervals</div>
          <div>{drill.reps} Reps</div>         
        </div>
      </div> )
  });

  return(
    // <section id="loginContainer" className="centeredContainer">
    <div className="historyContainer">
      <img id="logo" src="../assets/GAINZ_logo.png"></img>
      <h3 className="pageMainText">Gainz History:</h3>
        {drills}
    </div>
  );
};

{/* <div id="paper">

  <div id="pattern">
    <div id="content">
      Gainz History
    </div>
  </div>
</div> 
    <div class="container">
  <div class="box">A</div>
    <div class="box">B</div>
    <div class="box">C</div>
    <div class="box">D</div>
    <div class="box">E</div>
    <div class="box">F</div>
  </div>
*/}


export default HistoryDisplay;
