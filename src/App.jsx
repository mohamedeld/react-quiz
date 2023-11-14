import { useEffect, useReducer } from "react";
import Header from "./components/Header";

import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

// types
const DATA_RECEIVED = "DATA_RECEIVED";
const DATA_FAILED = "DATA_FAILED";
export const START = "START";
export const NEW_ANSWER = "NEW_ANSWER";
export const NEXT_QUESTION = "NEXT_QUESTION";
export const FINISH = "FINISH";
export const RESET = "RESET";
export const TICK = "TICK";
const SECOND_PER_QUESTION = 30;
// initialState
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case DATA_RECEIVED:
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case DATA_FAILED:
      return {
        ...state,
        status: "error",
      };
    case START:
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SECOND_PER_QUESTION,
      };
    case NEW_ANSWER:
      // eslint-disable-next-line no-case-declarations
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case NEXT_QUESTION:
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case FINISH:
      return {
        ...state,
        status: "finish",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case RESET:
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };

    // return {
    //   ...state,
    //   status: "reset",
    //   index: 0,
    //   answer: null,
    //   points: 0,
    //   highScore: 0,
    // }
    case TICK:
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondRemaining,
  } = state;
  useEffect(function () {
    fetch("http://localhost:3000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: DATA_RECEIVED, payload: data }))
      .catch((err) => dispatch({ type: DATA_FAILED }));
  }, []);
  const numOfQuestions = questions.length;
  const numOfPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsNumber={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numOfQuestion={numOfQuestions}
              index={index}
              points={points}
              numOfPoints={numOfPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numOfQuestions={numOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            points={points}
            numOfPoints={numOfPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
