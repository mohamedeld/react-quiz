import { useQuestion } from "../contexts/QuestionContext";

export default function Progress() {
  const { index, numOfQuestions, points, numOfPoints, answer } = useQuestion();
  return (
    <header className="progress">
      <progress
        max={numOfQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {numOfPoints}
      </p>
    </header>
  );
}
