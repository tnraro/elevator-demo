import { useState } from "react";
import "./app.css";
import { Elevator } from "./features/elevator";
import { ElevatorShaft } from "./features/elevator-shaft";
import { FloorButton } from "./features/floor-button";
import styles from "./app.module.css";

interface Elevator {
  id: number;
  currentFloor: number;
  targetFloor: number;
  moves: number;
}

function App() {
  const [height] = useState(15);
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

  const buttons = useButtons();

  return (
    <div className={styles.container}>
      <div className={styles["elevator-container"]}>
        {elevators.map((elevator) => (
          <ElevatorShaft
            key={elevator.id}
            id={elevator.id}
            height={height}
          >
            <Elevator {...elevator} onMove={(id) => {
              moveElevator(id);
            }} />
          </ElevatorShaft>
        ))}
      </div>
      <div className={styles["button-container"]}>
        {buttons.map(button => (
          <FloorButton key={button.id} {...button} onClick={(floor) => {
            callElevator(floor);
          }} />
        ))}
      </div>
    </div>
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

  function useButtons() {
    return Array.from({ length: height }, (_, i) => {
      return {
        id: i,
        floor: i + 1,
        isActivated: isActivated(),
      }

      function isActivated() {
        return elevators.find(elevator => i + 1 === elevator.targetFloor &&
          elevator.currentFloor !== elevator.targetFloor) != null
      }
    });
  }
}


export default App;
