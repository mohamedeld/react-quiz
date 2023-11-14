import { useReducer } from "react";
const INC = "INC";
const DEC = "DEC";
const setCount = "setCount";
const setStep = "setStep";
const RESET = "RESET";
const initialState = { count: 0, step: 1 };
function reducer(state, action) {
  switch (action.type) {
    case DEC:
      return {
        ...state,
        count: state.count - state.step,
      };
    case INC:
      return {
        ...state,
        count: state.count + state.step,
      };
    case setCount:
      return {
        ...state,
        count: action.payload,
      };
    case setStep:
      return {
        ...state,
        step: action.payload,
      };
    case RESET:
      return initialState;
    default:
      throw new Error("unknown action");
  }
}
function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;
  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: DEC });
  };

  const inc = function () {
    dispatch({ type: INC });
  };

  const defineCount = function (e) {
    dispatch({ type: setCount, payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: setStep, payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: RESET });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
