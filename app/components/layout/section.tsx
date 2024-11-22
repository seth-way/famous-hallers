import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { ReactNode } from "react";

import { motion, AnimatePresence } from "framer-motion";

const motionVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    transition: { duration: 0 },
  },
  highlight: {
    opacity: [0, 1, 0],
    scale: [0, 1, 1],
    transition: {
      type: "easeInOut",
      duration: 1,
      delay: 1,
      times: [0, 0.65, 1],
    },
  },
};

type SectionProps = {
  heading?: string;
  highlight: boolean;
  highlightKey: string;
  children: ReactNode;
};

export default function Section({
  heading,
  highlight,
  highlightKey,
  children,
}: SectionProps) {
  return (
    <Card className="relative z-20 max-h-full rounded-md border border-white/30 bg-[#bdbdbd]/30 font-bold">
      {heading && (
        <>
          <CardHeader className="justify-center p-1 md:p-3">
            <h2>{heading}</h2>
          </CardHeader>
          <Divider />
        </>
      )}
      <CardBody className="flex h-full w-full flex-col items-center gap-2 overflow-y-auto p-2 md:gap-4 md:p-4">
        {children}
      </CardBody>
      <AnimatePresence initial={false}>
        {highlight && (
          <motion.div
            className="absolute left-0 top-0 z-10 h-full w-full origin-center overflow-visible rounded-lg bg-gradient-to-br from-white/20 to-success-300/20 blur-lg"
            key={highlightKey}
            variants={motionVariants}
            initial="hidden"
            animate="highlight"
            exit="hidden"
          ></motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
