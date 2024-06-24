interface Props {
  id: number;
  currentFloor: number;
  targetFloor: number;
  moves: number;
  onMove: (id: number) => void;
}

export function Elevator(props: Props) {
  const isMoving = props.currentFloor !== props.targetFloor;
  return (
    <div
      className={[
        "elevator",
        isMoving && "elevator--moving",
      ].filter(x => x).join(" ")}
      style={{ "--current-floor": props.currentFloor }}
      onTransitionEnd={() => props.onMove(props.id)}
    >{props.currentFloor}</div>
  )
}