import { FINISH, NEXT_QUESTION } from "../App";

export default function NextButton({
  dispatch,
  answer,
  index,
  numOfQuestions,
}) {
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
