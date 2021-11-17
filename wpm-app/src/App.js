import './App.css';
import Counters from './Counters.js';
import TypingSpace from './TypingSpace.js';
import Buttons from './Buttons.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>WPM Counter</h1>
        <Counters />
        <TypingSpace />
        <Buttons />
      </header>
    </div>
  );
}

export default App;
