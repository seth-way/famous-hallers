import Section from "@/app/components/ui/section";
import HiddenInfo from "@/app/components/ui/hidden-info";

import { IPlayerInfo } from "@/lib/types";

type IAwards = IPlayerInfo["awards"];

type AwardsProps = {
  awards: IAwards;
};

export default function Awards({ awards }: AwardsProps) {
  console.log("AWARDS <>", awards);
  return (
    <Section heading="Awards">
      {awards &&
        awards.map(({ award, count }, idx) => (
          <div key={`award-${idx}`}>
            <HiddenInfo
              text={`${count}X - ${award}`}
              width="md"
              reveal={true}
            />
          </div>
        ))}
    </Section>
  );
}
