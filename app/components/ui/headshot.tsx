import { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { UserRound } from "lucide-react";

type HeadshotProps = {
  src: string;
  alt: string;
  reveal: boolean;
};

const profilePic = {
  hidden: { clipPath: "inset(0 0 0 0)" },
  revealed: {
    clipPath: [
      "inset(0 0 0 0)",
      "inset(0 100% 0 0)",
      "inset(0 100% 0 0)",
      "inset(0 0 0 0)",
    ],
    transition: {
      duration: 2,
      ease: "easeOut",
      times: [0, 0.3, 0.6, 1],
    },
  },
};

export default function Headshot({ src, alt, reveal }: HeadshotProps) {
  const [version, setVersion] = useState<"default" | "player">("default");
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  useEffect(() => {
    if (reveal) {
      setIsRevealed(true);
      setTimeout(() => {
        setVersion("player");
      }, 600);
    }
  }, [reveal]);

  return (
    <Card
      className={
        "aspect-2/3 h-32 max-h-full rounded-md bg-gradient-to-br from-success-400 to-success-50 md:h-60" +
        (reveal ? "" : " animate-pulse-subtle")
      }
    >
      <CardBody className="items-center justify-center py-0">
        <motion.div
          className="absolute inset-0"
          initial="hidden"
          animate={isRevealed ? "revealed" : "hidden"}
          variants={profilePic}
        >
          {version === "default" ? (
            <UserRound className="h-full w-full text-khaki" />
          ) : (
            <Image src={src} alt={alt} fill={true} />
          )}
        </motion.div>
      </CardBody>
    </Card>
  );
}
