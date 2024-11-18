import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Card, CardBody, CircularProgress } from "@nextui-org/react";

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

    return (
      <div className="flex flex-col items-center gap-1 font-semibold md:text-2xl">
        <Card
          isBlurred
          className="h-24 w-24 rounded-lg bg-gradient-to-br from-success-500/60 to-success-100/50 md:h-60 md:w-60"
        >
          <CardBody className="items-center justify-center py-0">
            <CircularProgress
              classNames={{
                svgWrapper: "absolute top-0 left-0 right-0 bottom-0",
                svg: "w-full h-full drop-shadow-md",
                indicator: "stroke-khaki-300",
                track: "stroke-khaki/30",
                label: "font-semibold text-white text-xs md:text-2xl",
              }}
              strokeWidth={4}
              aria-label="Current Score"
              value={score}
              maxValue={MAX_SCORE}
              label={`${score} pts`}
            />
          </CardBody>
        </Card>
        <h2>Score</h2>
      </div>
    );
  },
);

export default Score;
