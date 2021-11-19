import React, { useState, useEffect } from 'react';
import './App.css';
import Counters from './Counters.js';
import TypingSpace from './TypingSpace.js';
import Buttons from './Buttons.js';
import textSnippets from './text_snippets.json';

function App() {
  const initialMessage = "Type as many words as you can with 100% accuracy for 2 minutes. Errors will reduce your WPM!";

  const [seconds, setTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [words, setWords] = useState(0);
  const [errors, setErrors] = useState(0);
  const [areTesting, setAreTesting] = useState(false);
  const [interval, setTimeInterval] = useState(null);
  const [message, setMessage] = useState(initialMessage);

  const number = Math.floor(Math.random() * textSnippets.length);
  const textSnippet = textSnippets[number].snippet;
  
  const [typingText, setTypingText] = useState(textSnippet);
  const [internalText, setInternalText] = useState(textSnippet.split(' ').join(''));

  console.log(internalText);

  const startTest = () => {
    if (!areTesting) {
      setMessage(initialMessage);
      setWpm(0);
      setErrors(0);
      setWords(0);
      setTime(0);
      setAreTesting(true);
      const interval = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
      setTimeInterval(interval);
      document.getElementById("text").removeAttribute("disabled");
      document.getElementById("text").value = "";
      document.getElementById("text").focus();
    }
  };

  const stopTest = () => {
    if (areTesting) {
      setAreTesting(false);
      clearInterval(interval);
      document.getElementById("text").setAttribute("disabled", true);
      let messageFragment = "";
      let diff = ((wpm - 40) / 40) * 100;
      if (diff > 0) {
        messageFragment = "! That's " + diff + "% higher than average!";
      } else if (diff < 0) {
        messageFragment = "...that's " + Math.abs(diff) + "% below average, but hey, it's just typing.";
      } else {
        messageFragment = ". You're right at the average!";
      }
      setMessage("Your WPM is " + wpm + messageFragment);
    }
  };

  const getErrors = (words) => {
    // compare words to text string 
    // calculate number of char differences
    let diff = 0;

    words = words.split('').forEach(function(val, i) {
      if (val != internalText.charAt(i)) diff += 1;
    });
    setErrors(diff);
  };

  const getWords = (elem) => {
    // get contents of elem
    // compare to text
    // get number of errors
    var allWords = elem.target.value;
    var numWords = allWords.split('').length;
    setWords(numWords);
    allWords = allWords.replace(/\s+/g, '');
    getErrors(allWords);
  };

  // net WPM = gross WPM - (uncorrected errors / time ) = [(all typed entries/5) - uncorrected errors] / time (min)
  const calculateWpm = (seconds, words, errors) => {
    let wordsPerMinute = 0;
    if (words > 0) {
      if (words > 0 && seconds > 0) {
        wordsPerMinute = Math.round((words/5) - errors / (seconds/60));
        if (wordsPerMinute < 0) wordsPerMinute = 0;
      }
    }
    setWpm(wordsPerMinute); 
  };

  useEffect(() => {
    if (areTesting) {
      if (seconds == 120) {
        stopTest();
      }
      calculateWpm(seconds, words, errors);
    }
  });

  return (
    <div className="App">
      <div class="App__body">
        <h1>WPM Counter</h1>
        <div><p>{message}</p></div>
        <Counters time={seconds} wpm={wpm} errors={errors}/>
        <Buttons startTest={startTest} stopTest={stopTest} />
        <TypingSpace getWords={getWords} typingText={typingText}/>
      </div>
    </div>
  );
}

export default App;
