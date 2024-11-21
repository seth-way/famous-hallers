import { useState, useEffect } from "react";
import Section from "@/app/components/layout/section";
import Headshot from "@/app/components/ui/headshot";
import HiddenInfo from "@/app/components/ui/hidden-info";
import LeagueIcon from "@/app/components/ui/league-icon";
import Button from "@/app/components/ui/button";

const widthStyles = {
  sm: "w-12 md:w-20",
  md: "w-24 md:w-32",
  lg: "w-64",
  xl: "w-128",
};

type ProfileProps = {
  firstName: string;
  lastName: string;
  position: string;
  img: string;
  league: "MLB" | "NBA" | "NCAA" | "NFL" | "NHL";
  reveal: boolean;
};

export default function Profile({
  firstName,
  lastName,
  position,
  img,
  league,
  reveal,
}: ProfileProps) {
  return (
    <Section>
      <div className="flex max-h-full gap-2 border md:gap-4">
        <div className="flex flex-col items-center justify-around">
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
          <div className="flex w-full justify-between gap-2 md:gap-4">
            <LeagueIcon league={league} />
            <HiddenInfo
              text={position}
              width="sm"
              placeholder="pos"
              reveal={reveal}
            />
          </div>
          <Button
            variant="ghost"
            className="h-auto w-24 border-success-200 bg-khaki p-1 text-xs font-extrabold text-success-300 md:w-32 md:p-2 md:text-base"
            radius="sm"
          >
            Make a Guess
          </Button>
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
