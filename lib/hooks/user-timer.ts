import { useState, useRef, useEffect } from "react";

type UseTimerReturn = {
  time: number;
  start: (seconds: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
};

const useTimer = (): UseTimerReturn => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = (seconds: number): void => {
    setTime(seconds);
    setIsRunning(true);
  };

  const pause = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRunning(false);
  };

  // Resumes the timer
  const resume = (): void => {
    if (!isRunning && time > 0) {
      setIsRunning(true);
    }
  };

  const reset = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  return { time, start, pause, resume, reset };
};

export default useTimer;
