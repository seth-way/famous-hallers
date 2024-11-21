import { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "@/app/assets/svgs/Logo";

type TeamLogoProps = {
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

export default function TeamLogo({ src, alt, reveal }: TeamLogoProps) {
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
        "h-10 w-10 rounded-md bg-gradient-to-br from-success-500/60 to-success-100/50 p-0 md:h-16 md:w-16" +
        (reveal ? "" : " animate-pulse-subtle")
      }
    >
      <CardBody className="relative h-full w-full p-1">
        <motion.div
          className="flex h-full w-full items-center justify-center p-1"
          initial="hidden"
          animate={isRevealed ? "revealed" : "hidden"}
          variants={profilePic}
        >
          {version === "default" ? (
            <Logo className="text-khaki" height="100%" />
          ) : (
            <Image src={src} alt={alt} height={100} width={100} />
          )}
        </motion.div>
      </CardBody>
    </Card>
  );
}
