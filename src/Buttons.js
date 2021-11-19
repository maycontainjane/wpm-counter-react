import React from 'react';
import './App.css';

function Buttons(props) {
    return (  
      <div className="Buttons__container">    
        <div className="Buttons__startButton">
            <button className="Buttons__button" onClick={props.startTest}>Start</button>
        </div>
        <div className="Buttons__stopButton">
          <button className="Buttons__button" onClick={props.stopTest}>Stop</button>
        </div>
      </div>
    );
}
  
export default Buttons;