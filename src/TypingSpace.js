import React from 'react';
import './App.css';

function TypingSpace(props) {
    return (
      <div className="TypingSpace__container">
          <div className="TypingSpace__text">
              {props.typingText}
          </div>
          <div className="TypingSpace__box">
              <textarea id="text" disabled onInput={props.getWords} placeholder="This box will focus automatically when you press Start." 
                className="TypingSpace__textarea"  rows="15" cols="70"></textarea>
          </div>
      </div>
    );
}

export default TypingSpace;
