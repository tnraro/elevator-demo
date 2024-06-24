import { ReactNode } from "react";

interface Props {
  id: number;
  height: number;
  children: ReactNode;
}

export function ElevatorShaft(props: Props) {
  return (
    <div
      className="elevator-shaft"
      style={{ "--height": props.height }}>
      {props.children}
    </div>
  );
}