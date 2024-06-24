import { useEffect, useState } from "react";
import "./app.css";

interface Elevator {
  id: number;
  currentFloor: number;
  targetFloor: number;
  moves: number;
}

function App() {
  const [height, setHeight] = useState(15);
  const [elevators, setElevators] = useState<Elevator[]>([{
    id: 0,
    currentFloor: 1,
    targetFloor: 1,
    moves: 0,
  }, {
    id: 1,
    currentFloor: 1,
    targetFloor: 1,
    moves: 0,
  }, {
    id: 2,
    currentFloor: 1,
    targetFloor: 1,
    moves: 0,
  }]);
  const buttons = Array.from({ length: height }, (_, i) => i + 1);

  return (
    <>
      <div>
        <span>
          호출
        </span>
        {buttons.map(button => (
          <button
            key={button}
            onClick={() => {
              callElevator(button);
            }}>{button}</button>
        ))}
      </div>
      <div className="elevator-container">
        {elevators.map(({ id, currentFloor, targetFloor }) => (
          <div key={id} className="elevator-shaft" style={{ "--height": height }}>
            <div
              className={[
                "elevator",
                currentFloor !== targetFloor && "elevator--moving",
              ].filter(x => x).join(" ")}
              style={{ "--current-floor": currentFloor }}
              onTransitionEnd={() => {
                moveElevator(id);
              }}
            >{currentFloor}</div>
          </div>
        ))}
      </div>
    </>
  )

  function callElevator(floor: number) {
    const elevator = findIdleElevator();
    if (elevator == null) return;

    moveElevator(elevator.id, floor);

    function findIdleElevator() {
      return elevators
        .filter(elevator => elevator.currentFloor === elevator.targetFloor)
        .sort((a, b) => a.moves - b.moves)
        .at(0);
    }
  }

  function moveElevator(id: Elevator["id"], targetFloor?: number) {
    setElevators(elevators => elevators.map(e => {
      if (e.id !== id) return e;
      const target = targetFloor ?? e.targetFloor;
      const direction = Math.sign(target - e.currentFloor);
      return {
        ...e,
        currentFloor: e.currentFloor + direction,
        targetFloor: target,
        moves: e.moves + Math.abs(target - e.currentFloor),
      }
    }));
  }
}

export default App;
