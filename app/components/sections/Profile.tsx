import { useState, useEffect } from "react";
import Section from "@/app/components/ui/section";
import { motion } from "framer-motion";
import Image from "next/image";
import Headshot from "@/app/components/ui/headshot";
import HiddenInfo from "@/app/components/ui/hidden-info";
import { UserRound } from "lucide-react";

type ProfileProps = {
  firstName: string;
  lastName: string;
  position: string;
  img: string;
  reveal: boolean;
};

export default function Profile({
  firstName,
  lastName,
  position,
  img,
  reveal,
}: ProfileProps) {
  return (
    <Section>
      <div className="flex gap-2 md:gap-4">
        <div className="flex flex-col items-end justify-around">
          <HiddenInfo
            text={firstName}
            width="md"
            placeholder="first"
            reveal={reveal}
          />
          <HiddenInfo
            text={lastName}
            width="md"
            placeholder="last"
            reveal={reveal}
          />
          <HiddenInfo
            text={position}
            width="sm"
            placeholder="pos"
            reveal={reveal}
          />
        </div>
        <Headshot
          src={img}
          alt={`${firstName} ${lastName} headshot`}
          reveal={reveal}
        />
      </div>
    </Section>
  );
}
