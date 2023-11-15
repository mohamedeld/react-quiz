import { createContext, useReducer, useContext, useEffect } from "react";

const QuestionContext = createContext();
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

function QuestionProvider({ children }) {
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
    <QuestionContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondRemaining,
        numOfQuestions,
        numOfPoints,
        dispatch,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}

function useQuestion() {
  const context = useContext(QuestionContext);
  if (context === undefined)
    throw new Error("Question context is used outside Question provider");
  return context;
}

export { QuestionProvider, useQuestion };
