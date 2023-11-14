import { START } from "./../App";
export default function StartScreen({ questionsNumber, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome To The React Quiz</h2>
      <h3>{questionsNumber} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={() => dispatch({ type: START })}>
        Let&apos;s start
      </button>
    </div>
  );
}
