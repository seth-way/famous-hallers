"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import Section from "@/app/components/ui/section";
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

  return (
    <Section heading="Team History">
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
    </Section>
  );
}

function getTeamLogo(abbr: IAnyTeam, teams: ITeam[]): string {
  const team = teams.find((team) => team.abbr === abbr);
  return team?.logo || "";
}
