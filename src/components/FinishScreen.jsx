import { RESET } from "../App";

export default function FinishScreen({
  points,
  numOfPoints,
  highScore,
  dispatch,
}) {
  const percentage = (points / numOfPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {numOfPoints} (
        {Math.ceil(percentage)})
      </p>
      <p className="highscore">(Highscore: {highScore})</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: RESET })}>
        Reset{" "}
      </button>
    </>
  );
}
