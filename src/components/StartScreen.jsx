import { useQuestion } from "../contexts/QuestionContext";
import { START } from "./../contexts/QuestionContext";

export default function StartScreen() {
  const { numOfQuestions, dispatch } = useQuestion();
  return (
    <div className="start">
      <h2>Welcome To The React Quiz</h2>
      <h3>{numOfQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={() => dispatch({ type: START })}>
        Let&apos;s start
      </button>
    </div>
  );
}
