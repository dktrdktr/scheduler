import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    // working with (prev) state to avoid the stale state problem
    setHistory((prev) => {
      const newHistory = [...prev];
      if (replace) {
        // replace the last history item with the new mode
        newHistory.splice(-1, 1, newMode);
      } else {
        newHistory.push(newMode);
      }
      return newHistory;
    });
    setMode(newMode);
  };

  const back = () => {
    // execute only if history is longer than 1
    if (history.length > 1) {
      const newHistory = [...history];
      // remove the last history item and update the history
      newHistory.pop();
      setHistory(newHistory);
      // set mode to the last item in history
      setMode(newHistory.slice(-1)[0]);
    }
  };
  return { mode, transition, back, history };
}
