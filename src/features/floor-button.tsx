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
        "floor-button",
        props.isActivated && "floor-button--activated",
      ].filter(x => x).join(" ")}
      key={props.id}
      onClick={() => props.onClick(props.floor)}
    >{props.floor}</button>
  )
}