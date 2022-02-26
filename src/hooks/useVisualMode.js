import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // This line is new!

  const transition = (newMode, replace = false) => {
    const newHistory = [...history];
    if (replace) {
      newHistory.splice(-1, 1, newMode);
    } else {
      newHistory.push(newMode);
    }
    setHistory(newHistory);
    setMode(newMode);
  };

  const back = () => {
    if (history.length !== 1) {
      const historyCopy = [...history];
      historyCopy.pop();
      setHistory(historyCopy);
      setMode(historyCopy.slice(-1)[0]);
    }
  };
  return { mode, transition, back };
}
