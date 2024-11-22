import { useState, useEffect } from "react";
import Section from "@/app/components/layout/section";
import Headshot from "@/app/components/ui/headshot";
import HiddenInfo from "@/app/components/ui/hidden-info";
import LeagueIcon from "@/app/components/ui/league-icon";
import { Button } from "@nextui-org/react";

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
  handleOpenModal: () => void;
  reveal: boolean;
  completed: boolean;
};

export default function Profile({
  firstName,
  lastName,
  position,
  img,
  league,
  handleOpenModal,
  reveal,
  completed,
}: ProfileProps) {
  const [highlight, setHighlight] = useState<boolean>(false);

  useEffect(() => {
    if (reveal) {
      setHighlight(true);
      setTimeout(() => {
        setHighlight(false);
      }, 3000);
    }
  }, [reveal]);

  return (
    <Section highlightKey="profile-section" highlight={highlight}>
      <div className="flex max-h-full gap-2 md:gap-4">
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
          {!completed && (
            <Button
              variant="ghost"
              className="h-auto w-24 border-success-200 bg-khaki p-1 text-xs font-extrabold text-success-300 md:w-32 md:p-2 md:text-base"
              radius="sm"
              onPress={handleOpenModal}
            >
              Guess Player
            </Button>
          )}
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
