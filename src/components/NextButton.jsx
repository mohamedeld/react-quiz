import { useQuestion } from "../contexts/QuestionContext";
import { NEXT_QUESTION, FINISH } from "./../contexts/QuestionContext";

export default function NextButton() {
  const { dispatch, answer, index, numOfQuestions } = useQuestion();
  if (answer === null) return null;
  if (index < numOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: NEXT_QUESTION })}
      >
        Next{" "}
      </button>
    );
  if (index === numOfQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: FINISH })}>
        Finish{" "}
      </button>
    );
}
