import { useEffect } from "react";
import { TICK } from "../App";

export default function Timer({ dispatch, secondRemaining }) {
  const mins = Math.floor(secondRemaining / 60);
  const seconds = secondRemaining % 60;
  useEffect(
    function () {
      const timer = setInterval(() => {
        dispatch({ type: TICK });
      }, 1000);
      return () => clearInterval(timer);
    },

    [dispatch]
  );
  return (
    <div className="timer">
      {mins}:{seconds}
    </div>
  );
}
