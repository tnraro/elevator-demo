import styles from "./elevator.module.css"

interface Props {
  id: number;
  currentFloor: number;
  targetFloor: number;
  moves: number;
  isMoving: boolean;
  onMove: (id: number) => void;
}

export function Elevator(props: Props) {
  return (
    <div
      className={[
        styles["elevator"],
        props.isMoving && styles["elevator--moving"],
      ].filter(x => x).join(" ")}
      style={{ "--current-floor": props.currentFloor }}
      onTransitionEnd={() => props.onMove(props.id)}
    >{props.currentFloor}</div>
  )
}