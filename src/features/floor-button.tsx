import styles from "./floor-button.module.css";

interface Props {
  id: number;
  floor: number;
  isActivated: boolean;
  onClick: (floor: number) => void;
}

export function FloorButton(props: Props) {
  return (
    <button
      className={[
        styles["floor-button"],
        props.isActivated && styles["floor-button--activated"],
      ].filter(x => x).join(" ")}
      disabled={props.isActivated}
      key={props.id}
      onClick={() => props.onClick(props.floor)}
    >{props.floor}</button>
  )
}