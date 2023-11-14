import { useEffect } from "react";
import { TICK } from "../App";

export default function Timer({ dispatch }) {
  useEffect(
    function () {
      setInterval(() => {
        dispatch({ type: TICK });
      }, 1000);
    },
    [dispatch]
  );
  return <div className="timer"></div>;
}
