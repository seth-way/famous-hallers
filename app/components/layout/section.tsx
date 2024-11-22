import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { ReactNode } from "react";

import { motion, AnimatePresence } from "framer-motion";

const motionVariants = {
  hidden: {
    opacity: 0,
    scaleX: 0,
    transition: { duration: 0 },
  },
  highlight: {
    opacity: [1, 1, 1],
    scaleX: [0, 1, 0],
    top: 0,
    left: [0, 0, 1],
    transition: { type: "ease", duration: 8, times: [0, 0.5, 1] },
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
    <Card className="relative max-h-full rounded-md border border-white/30 bg-[#bdbdbd]/30 font-bold">
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
            className="absolute bg-white/80"
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
