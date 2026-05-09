import { useEffect, useState } from "react";

import { timeRemaining } from "../../utils/format.js";

const formatSeconds = (ms) => Math.ceil(ms / 1000);

export default function CountdownTimer({ target }) {
  const [remaining, setRemaining] = useState(timeRemaining(target));

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(timeRemaining(target));
    }, 1000);
    return () => clearInterval(timer);
  }, [target]);

  if (!target) return null;

  const seconds = formatSeconds(remaining);
  const warning = seconds <= 10;

  return (
    <div className={`countdown ${warning ? "animate-alert" : ""}`}>
      <svg width="20" height="20" viewBox="0 0 60 60">
        <circle
          cx="30"
          cy="30"
          r="25"
          stroke={warning ? "#ff4d5a" : "#ff9a3d"}
          strokeWidth="6"
          fill="none"
          strokeDasharray="157"
          style={{ animation: "ringShrink 1s linear infinite" }}
        />
      </svg>
      <span>{seconds}s</span>
    </div>
  );
}
