import styles from "./elevator.module.css"

interface Props {
  id: number;
  currentFloor: number;
  targetFloor: number;
  moves: number;
  isMoving: boolean;
  height: number;
  onMove: (id: number) => void;
}

export function Elevator(props: Props) {
  return (
    <div
      className={[
        styles["elevator"],
        props.isMoving && styles["elevator--moving"],
      ].filter(x => x).join(" ")}
      style={{ "--rate": (props.currentFloor - 1) / (props.height - 1) }}
      onTransitionEnd={() => props.onMove(props.id)}
    >{props.currentFloor}</div>
  )
}