import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import Section from "@/app/components/layout/section";
import { Card, CardBody, CircularProgress } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";

const MAX_SCORE = 1000;
const SCORE_PER_SECOND = 5;
const GUESS_PENALTY = 100;

const motionVariants = {
  hidden: {
    opacity: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0 },
  },
  visible: {
    opacity: 1,
    y: 30,
    scale: 1.2,
    transition: { type: "spring", duration: 2 },
  },
};

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
    const [highlight, setHighlight] = useState<boolean>(false);
    const [showIndicator, setShowIndicator] = useState<boolean>(false);

    useEffect(() => {
      if (!runScoreTimer) return;

      const timerId = setInterval(() => {
        setScore((prevScore) => Math.max(prevScore - SCORE_PER_SECOND, 0));
      }, 1000);

      return () => clearInterval(timerId); // Cleanup interval on unmount or pause
    }, [runScoreTimer]);

    useEffect(() => {
      if (guessCount) {
        setShowIndicator(true);
        setScore((prev) => prev - GUESS_PENALTY);
        setTimeout(() => {
          setShowIndicator(false);
        }, 1500);
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
      <Section
        heading="Score"
        highlightKey="score-section"
        highlight={highlight}
      >
        <Card className="relative aspect-square h-full w-20 rounded-md bg-gradient-to-br from-success-400 to-success-50 text-xs font-semibold md:w-40 md:text-2xl">
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
            <AnimatePresence>
              {showIndicator && (
                <motion.p
                  className="absolute rounded-xl border-success-100 bg-white/70 p-2 font-bold text-red-700"
                  key="bad-guess-indicator"
                  variants={motionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >{`-${GUESS_PENALTY} points`}</motion.p>
              )}
            </AnimatePresence>
          </CardBody>
        </Card>
      </Section>
    );
  },
);

export default Score;
