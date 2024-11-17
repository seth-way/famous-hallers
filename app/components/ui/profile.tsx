import { useState, useEffect } from "react";
import { Card, CardBody, CircularProgress } from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import HiddenImg from "@/app/components/ui/hidden-img";
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
    <div className="align-stretch flex gap-4">
      <div className="justify-around flex flex-col items-end">
        <HiddenInfo text={firstName} width="md" reveal={true} />
        <HiddenInfo text={lastName} width="md" reveal={true} />
        <HiddenInfo text={position} width="sm" reveal={true} />
      </div>
      <HiddenImg
        src={img}
        alt={`${firstName} ${lastName} headshot`}
        reveal={reveal}
      />
    </div>
  );
}
