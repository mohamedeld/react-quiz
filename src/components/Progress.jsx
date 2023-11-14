export default function Progress({
  index,
  numOfQuestion,
  points,
  numOfPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numOfQuestion}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numOfQuestion}
      </p>
      <p>
        <strong>{points}</strong> / {numOfPoints}
      </p>
    </header>
  );
}
