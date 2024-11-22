import { useState, useEffect } from "react";
import Section from "@/app/components/layout/section";
import HiddenInfo from "@/app/components/ui/hidden-info";
import { IPlayerInfo } from "@/lib/types";

type IAwards = IPlayerInfo["awards"];

type AwardsProps = {
  awards: IAwards;
  revealTracker: boolean[];
};

export default function Awards({ awards, revealTracker }: AwardsProps) {
  const [highlight, setHighlight] = useState<boolean>(false);

  useEffect(() => {
    if (revealTracker && revealTracker.includes(true)) {
      setHighlight(true);
      setTimeout(() => {
        setHighlight(false);
      }, 3000);
    }
  }, [JSON.stringify(revealTracker)]);

  return (
    <Section
      heading="Awards"
      highlight={highlight}
      highlightKey="awards-section"
    >
      {awards &&
        awards.map(({ award, count }, idx) => (
          <div key={`awards-${idx}`}>
            <HiddenInfo
              text={`${count}X - ${award}`}
              width="md"
              reveal={revealTracker[idx]}
            />
          </div>
        ))}
    </Section>
  );
}
