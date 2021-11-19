import React, { useState, useEffect } from 'react';
import './App.css';
import Counters from './Counters.js';
import TypingSpace from './TypingSpace.js';
import Buttons from './Buttons.js';

function App() {
  const [seconds, setTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [words, setWords] = useState(0);
  const [errors, setErrors] = useState(0);
  const [areTesting, setAreTesting] = useState(false);
  const [interval, setTimeInterval] = useState(null);
  const [message, setMessage] = useState("Type as many words as you can with 100% accuracy for 1 minute. Errors will reduce your WPM!");

  let testWords = "Onemorning,whenGregorSamsawokefromtroubleddreams,hefoundhimself\
transformedinhisbedintoahorriblevermin.Helayonhisarmour-likeback,andifhe\
liftedhisheadalittlehecouldseehisbrownbelly,slightlydomedanddividedbyarches\
intostiffsections.Thebeddingwashardlyabletocoveritandseemedreadytoslideoff\
anymoment.Hismanylegs,pitifullythincomparedwiththesizeoftherestofhim,waved\
abouthelplesslyashelooked.\"What'shappenedtome?\"hethought.Itwasn'tadream."

  const startTest = () => {
    if (!areTesting) {
      setTime(1);
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
      setTime(0);
      setWpm(0);
      setErrors(0);
      setWords(0);
      document.getElementById("text").setAttribute("disabled", true);
    }
  };

  const getErrors = (words) => {
    // compare words to text string 
    // calculate number of char differences
    let diff = 0;

    words = words.split('').forEach(function(val, i) {
      if (val != testWords.charAt(i)) diff += 1;
    });
    setErrors(diff);
  };

  const getWords = (elem) => {
    // get contents of elem
    // compare to text
    // get number of errors
    var allWords = elem.target.value;
    var numWords = allWords.split(" ").length;
    setWords(numWords);
    allWords = allWords.replace(/\s+/g, '');
    getErrors(allWords);
  };

  // net WPM = gross WPM - (uncorrected errors / time ) = [(all typed entries/5) - uncorrected errors] / time (min)
  const calculateWpm = (seconds, words, errors) => {
    let wordsPerMinute = 0;
    if (words > 0) {
      if (words > 0 && seconds > 0) {
        wordsPerMinute = Math.round((words - (errors / 10)) / (seconds / 60));
        if (wordsPerMinute < 0) wordsPerMinute = 0;
      }
    }
    setWpm(wordsPerMinute); 
  };

  useEffect(() => {
    if (areTesting) {
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
        <TypingSpace getWords={getWords}/>
      </div>
    </div>
  );
}

export default App;
