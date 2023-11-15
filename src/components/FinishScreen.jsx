import { useQuestion } from "../contexts/QuestionContext";
import { RESET } from "./../contexts/QuestionContext";

export default function FinishScreen() {
  const { points, numOfPoints, highScore, dispatch } = useQuestion();
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
