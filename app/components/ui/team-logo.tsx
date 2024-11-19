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
        "h-12 w-12 rounded-md bg-gradient-to-br from-success-500/60 to-success-100/50 p-1 md:h-16 md:w-16 md:p-4" +
        (reveal ? "" : " animate-pulse-subtle")
      }
    >
      <CardBody className="items-center justify-center p-0">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial="hidden"
          animate={isRevealed ? "revealed" : "hidden"}
          variants={profilePic}
        >
          {version === "default" ? (
            <Logo className="text-khaki-600/90" height="100%" />
          ) : (
            <Image src={src} alt={alt} fill={true} />
          )}
        </motion.div>
      </CardBody>
    </Card>
  );
}
