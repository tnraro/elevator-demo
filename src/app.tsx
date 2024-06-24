import { useEffect, useState } from "react";
import "./app.css";

function App() {
  const [height, setHeight] = useState(15);
  const [elevators, setElevators] = useState([1, 1, 1]);
  const buttons = Array.from({ length: height }, (_, i) => i + 1);

  useEffect(() => {
    // for test
    const timer = setInterval(() => {
      setElevators(Array.from({ length: 3 }).map(() => Math.random() * 15 + 1 | 0));
    }, 1000);
    return () => {
      clearInterval(timer);
    }
  }, []);

  return (
    <>
      <div>
        <span>
          호출
        </span>
        {buttons.map(button => (
          <button key={button}>{button}</button>
        ))}
      </div>
      <div className="elevator-container">
        {elevators.map(floor => (
          <div className="elevator-shaft" style={{ "--height": height }}>
            <div className="elevator" style={{ "--current-floor": floor }}>{floor}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App;
