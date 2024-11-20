import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import HiddenInfo from "@/app/components/ui/hidden-info";

import { IPlayerInfo } from "@/lib/types";

type IAwards = IPlayerInfo["awards"];

type AwardsProps = {
  awards: IAwards;
  revealTracker: boolean[];
};

export default function Awards({ awards, revealTracker }: AwardsProps) {
  return (
    <Card className="rounded-md bg-[#bdbdbd]/30 font-bold">
      <CardHeader className="justify-center p-1 md:p-3">
        <h2>Awards</h2>
      </CardHeader>
      <Divider />
      <CardBody className="flex h-full w-full flex-col items-center gap-2 p-2 md:gap-4 md:p-4">
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
      </CardBody>
    </Card>
  );
}
