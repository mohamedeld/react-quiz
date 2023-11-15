import { NEW_ANSWER } from "./../contexts/QuestionContext";
import { useQuestion } from "../contexts/QuestionContext";

export default function Options({ question }) {
  const { dispatch, answer } = useQuestion();
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswer
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={hasAnswer}
            onClick={() => dispatch({ type: NEW_ANSWER, payload: index })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
