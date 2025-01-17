export default function Die(props) {
  return (
    <div
      className={"die-face" + (props.isHeld ? " is-held" : "")}
      onClick={props.holdDice}
    >
      <h2>{props.value}</h2>
    </div>
  );
}
