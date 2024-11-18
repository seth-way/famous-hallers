import { useState, useEffect, useMemo } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";

type HiddenInfoProps = {
  text: string | number;
  placeholder?: string;
  reveal: boolean;
  width: "sm" | "md" | "lg" | "xl";
};
// potential widths -> 2, 4, 6, 8, 12, 16, 20, 24, 32
const widthStyles = {
  sm: "w-16",
  md: "w-32",
  lg: "w-64",
  xl: "w-128",
};

const info = {
  hide: {
    opacity: 0,
    filter: "blur(10px)",
  },
  show: (revealed: boolean) => ({
    opacity: 1,
    filter: "blur(0px)",
    color: revealed ? "white" : "khaki",
  }),
};

const TRANSITION_TIME = 1;

export default function HiddenInfo({
  text,
  placeholder = "",
  reveal,
  width,
}: HiddenInfoProps) {
  const [version, setVersion] = useState<"hide" | "show">("show");
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>(placeholder);
  const widthStyle = widthStyles[width];

  useEffect(() => {
    if (reveal) {
      setVersion("hide");
      setTimeout(() => {
        setIsRevealed(true);
        setVersion("show");
      }, TRANSITION_TIME * 1000);
    }
  }, [reveal]);

  return (
    <Card
      className={
        `rounded-md bg-gradient-to-br from-success-500/60 to-success-100/50 text-center ${widthStyle}` +
        (isRevealed ? "" : " animate-pulse-subtle")
      }
    >
      <CardBody className="p-1 text-center text-xs font-semibold md:text-lg">
        <motion.h3
          initial="show"
          animate={version}
          variants={info}
          custom={isRevealed}
          transition={{ duration: TRANSITION_TIME, ease: "easeInOut" }}
        >
          {isRevealed ? text : placeholder}
        </motion.h3>
      </CardBody>
    </Card>
  );
}
