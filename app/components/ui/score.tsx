import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
} from "@nextui-org/react";

const MAX_SCORE = 2000;
const GUESS_PENALTY = 100;

type ScoreProps = {
  runScoreTimer: boolean;
  guessCount: number;
};

export type ScoreRef = {
  getScore: () => number;
};

const Score = forwardRef<ScoreRef, ScoreProps>(
  ({ runScoreTimer, guessCount }, ref) => {
    const [score, setScore] = useState<number>(MAX_SCORE);
    const [guesses, setGuesses] = useState<number>(0);

    useEffect(() => {
      if (!runScoreTimer) return;

      const timerId = setInterval(() => {
        setScore((prevScore) => Math.max(prevScore - 1, 0));
      }, 1000);

      return () => clearInterval(timerId); // Cleanup interval on unmount or pause
    }, [runScoreTimer]);

    useImperativeHandle(ref, () => ({
      getScore: () => score,
    }));
    // h-24 md:h-60
    return (
      <Card
        isBlurred
        className="w-28 rounded-lg bg-gradient-to-br from-success-500/60 to-success-100/50 text-xs font-semibold md:w-60 md:text-2xl"
      >
        <CardHeader className="justify-center p-0 pt-2">
          <h2>Score</h2>
        </CardHeader>
        <CardBody className="items-center justify-center py-0">
          <CircularProgress
            classNames={{
              svgWrapper: "absolute top-0 left-0 right-0 bottom-0",
              svg: "w-full h-full drop-shadow-md",
              indicator: "stroke-khaki-300",
              track: "stroke-khaki/30",
              label: "text-white text-xs md:text-xl",
            }}
            strokeWidth={4}
            aria-label="Current Score"
            value={score}
            maxValue={MAX_SCORE}
            label={`${score} pts`}
          />
        </CardBody>
      </Card>
    );
  },
);

export default Score;
