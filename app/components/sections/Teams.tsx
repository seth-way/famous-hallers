"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import HiddenInfo from "@/app/components/ui/hidden-info";
import TeamLogo from "@/app/components/ui/team-logo";
import { IPlayerInfo, IAnyTeam } from "@/lib/types";

type ITeam = {
  abbr: IAnyTeam;
  league: string;
  location: string;
  mascot: string;
  logo: string;
};

type ITeams = IPlayerInfo["teams"];

type TeamsProps = {
  teams: ITeams;
  setError: Dispatch<SetStateAction<string | null>>;
};

export default function Teams({ teams, setError }: TeamsProps) {
  const [teamsInfo, setTeamsInfo] = useState<ITeam[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getTeamsInfo = async () => {
      try {
        const fetchTeams = teams.map(async ({ team }) => {
          const res = await fetch(`/dummyData/teams/${team}.json`);
          return await res.json();
        });

        const results = await Promise.all(fetchTeams);
        setTeamsInfo(results);
      } catch (err) {
        const errorCode =
          err instanceof Error && err.message.includes("404") ? "404" : "500";
        setError(err instanceof Error ? err.message : "unknown error");
        router.push(`/error/${errorCode}`);
      }
    };
    if (teams && teams.length) getTeamsInfo();
  }, [teams]);
  console.log("teams <><>", teams);
  return (
    <Card className="max-h-full rounded-md bg-[#bdbdbd]/30 font-bold">
      <CardHeader className="justify-center p-1 md:p-3">
        <h2>Team History</h2>
      </CardHeader>
      <Divider />
      <CardBody className="flex h-full w-full flex-col items-center gap-2 p-1 md:gap-4 md:p-4">
        {teamsInfo.length &&
          teams.map(({ start, end, team }, idx) => (
            <div
              className="flex items-center gap-2 md:gap-4"
              key={`teams-${idx}`}
            >
              <HiddenInfo
                text={`${start} - ${end}`}
                placeholder="XXXX - XXXX"
                reveal={true}
                width="md"
              />
              <TeamLogo
                src={getTeamLogo(team, teamsInfo)}
                alt="Draft Team Logo"
                reveal={true}
              />
            </div>
          ))}
        {/*</CardBody> <Table
          //   hideHeader
          //   removeWrapper
          //   aria-label="Player draft info"
          //   className="font-bold"
          //   classNames={{ td: "p-1 md:p-2" }}
          // >
          //   <TableHeader>
          //     <TableColumn>YEARS</TableColumn>
          //     <TableColumn>TEAM</TableColumn>
          //   </TableHeader>
          //   <TableBody>
          //     {teams.map(({ start, end, team }, idx) => (
          //       <TableRow key={`team-info-${idx}`}>
          //         <TableCell>
          //           <HiddenInfo
          //             text={`${start} - ${end}`}
          //             placeholder="XXXX - XXXX"
          //             reveal={true}
          //             width="md"
          //           />
          //         </TableCell>
          //         <TableCell>
          //           <TeamLogo
          //             src={getTeamLogo(team, teamsInfo)}
          //             alt="Draft Team Logo"
          //             reveal={true}
          //           />
          //         </TableCell>
          //       </TableRow>
          //     ))}
          //   </TableBody>
          // </Table>
        // )} */}
      </CardBody>
    </Card>
  );
}

function getTeamLogo(abbr: IAnyTeam, teams: ITeam[]): string {
  const team = teams.find((team) => team.abbr === abbr);
  return team?.logo || "";
}
