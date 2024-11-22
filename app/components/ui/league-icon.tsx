import { Card, CardBody } from "@nextui-org/react";
import MLB from "@/app/assets/svgs/MLB";
import NBA from "@/app/assets/svgs/NBA";
import NCAA from "@/app/assets/svgs/NCAA";
import NFL from "@/app/assets/svgs/NFL";
import NHL from "@/app/assets/svgs/NHL";

type LeagueIconProps = {
  league: "MLB" | "NBA" | "NCAA" | "NFL" | "NHL";
};

const leagueLogos = {
  MLB: <MLB />,
  NBA: <NBA />,
  NCAA: <NCAA />,
  NFL: <NFL />,
  NHL: <NHL />,
};

export default function LeagueIcon({ league }: LeagueIconProps) {
  return (
    <Card className="w-10 animate-pulse-subtle rounded-md bg-gradient-to-br from-success-400 to-success-50 text-center md:w-16">
      <CardBody className="justify-center p-1 text-center text-xs font-semibold md:text-lg">
        {leagueLogos[league]}
      </CardBody>
    </Card>
  );
}
