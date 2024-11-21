import { useState, useRef, useEffect } from "react";

export default function useTimer(initialTime: number) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
  };

  const stop = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = (newTime: number) => {
    stop();
    setTime(newTime);
  };

  useEffect(() => {
    if (time <= 0) {
      stop(); // Stop when time hits zero
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [time]);

  return { time, isRunning, start, stop, reset };
}
