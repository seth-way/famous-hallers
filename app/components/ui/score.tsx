import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
} from "@nextui-org/react";

const MAX_SCORE = 1000;
const SCORE_PER_SECOND = 5;
const GUESS_PENALTY = 100;

type ScoreProps = {
  runScoreTimer: boolean;
  guessCount: number;
  handleTimesUp: () => void;
};

export type ScoreRef = {
  getScore: () => number;
};

const Score = forwardRef<ScoreRef, ScoreProps>(
  ({ runScoreTimer, guessCount, handleTimesUp }, ref) => {
    const [score, setScore] = useState<number>(MAX_SCORE);

    useEffect(() => {
      if (!runScoreTimer) return;

      const timerId = setInterval(() => {
        setScore((prevScore) => Math.max(prevScore - SCORE_PER_SECOND, 0));
      }, 1000);

      return () => clearInterval(timerId); // Cleanup interval on unmount or pause
    }, [runScoreTimer]);

    useEffect(() => {
      console.log("guessCount changed....");
      if (guessCount) {
        setScore((prev) => prev - GUESS_PENALTY);
        console.log("guess count updated");
      }
    }, [guessCount]);

    useEffect(() => {
      if (!score) handleTimesUp();
    }, [score]);

    useImperativeHandle(ref, () => ({
      getScore: () => score,
    }));
    // h-24 md:h-60
    return (
      <Card className="w-24 rounded-md bg-[#bdbdbd]/30 font-bold md:w-60">
        <CardHeader className="justify-center p-0 pt-1 md:pt-2">
          <h2>Score</h2>
        </CardHeader>
        <CardBody className="h-full w-full p-1 md:p-4">
          <Card
            isBlurred
            className="h-full w-full rounded-md bg-gradient-to-br from-success-500/60 to-success-100/50 text-xs font-semibold md:text-2xl"
          >
            <CardBody className="items-center justify-center py-0">
              <CircularProgress
                classNames={{
                  svgWrapper: "absolute top-0 left-0 right-0 bottom-0",
                  svg: "w-full h-full drop-shadow-md stroke-2 md:stroke-4",
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
        </CardBody>
      </Card>
    );
  },
);

export default Score;
