import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // This line is new!

  const transition = (newMode) => {
    console.log("TRANSITION");
    console.log("TRANSITION: newMode is", newMode);
    const newHistory = [...history, newMode];
    console.log("TRANSITION: history is", history);
    console.log("TRANSITION: newHistory is", newHistory);
    setHistory(newHistory);
    setMode(newMode);
  };

  const back = () => {
    console.log("BACK");
    console.log("BACK: history is", history);
    const historyCopy = [...history];
    historyCopy.pop();
    console.log("BACK: historyCopy after pop()", historyCopy);
    console.log("BACK: historyCopy last item", historyCopy.slice(-1)[0]);
    setHistory(historyCopy);
    setMode(historyCopy.slice(-1)[0]);
  };
  console.log("history is", mode);
  console.log("current mode is", mode);
  return { mode, transition, back };
}
