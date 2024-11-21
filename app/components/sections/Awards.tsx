import Section from "@/app/components/layout/section";
import HiddenInfo from "@/app/components/ui/hidden-info";

import { IPlayerInfo } from "@/lib/types";

type IAwards = IPlayerInfo["awards"];

type AwardsProps = {
  awards: IAwards;
  revealTracker: boolean[];
};

export default function Awards({ awards, revealTracker }: AwardsProps) {
  return (
    <Section heading="Awards">
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
