import React from 'react';
import './App.css';

function TypingSpace(props) {
    return (
      <div className="TypingSpace__container">
            <div className="TypingSpace__text">
              <p>One morning, when Gregor Samsa woke from troubled dreams, he found himself 
              transformed in his bed into a horrible vermin.</p>
              <p>He lay on his armour-like back, and if he lifted his head a little he could 
                see his brown belly, slightly domed and divided by arches into stiff 
                sections.</p>
              <p>The bedding was hardly able to cover it and seemed ready to slide off any 
                moment. His many legs, pitifully thin compared with the size of the rest of 
                him, waved about helplessly as he looked. "What's happened to me?" he 
                thought. It wasn't a dream.</p>
          </div>
          <div className="TypingSpace__box">
              <textarea id="text" disabled onInput={props.getWords} placeholder="This box will focus automatically when you press Start." 
                className="TypingSpace__textarea"  rows="15" cols="70"></textarea>
          </div>
      </div>
    );
}

export default TypingSpace;
