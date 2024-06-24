import { ReactNode } from "react";
import styles from "./elevator-shaft.module.css"

interface Props {
  id: number;
  height: number;
  children: ReactNode;
}

export function ElevatorShaft(props: Props) {
  return (
    <div
      className={styles["elevator-shaft"]}
      style={{ "--height": props.height }}>
      {props.children}
    </div>
  );
}