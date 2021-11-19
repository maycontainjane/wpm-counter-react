import React from 'react';
import './App.css';

function Counters(props) {
  return (
    <div className="Counters__container">
      <div className="Counters__timeCounter">Time: {props.time}</div>
      <div className="Counters__wpmCounter">WPM: {props.wpm}</div>
      <div className="Counters__errorCounter">Errors: {props.errors}</div>
    </div>
  );
}

export default Counters;
