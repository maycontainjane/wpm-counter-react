import WpmCounter from './WpmCounter.js';
import TimeCounter from './TimeCounter.js';

function Counters() {
  return (
    <div className="counters">
      <div><TimeCounter /></div>
      <div><WpmCounter /></div>
    </div>
  );
}

export default Counters;
