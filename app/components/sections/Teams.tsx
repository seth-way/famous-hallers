"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import Section from "@/app/components/layout/section";
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

type IRevealTracker = {
  college: boolean;
  teams: { years: boolean; logo: boolean }[];
};

type TeamsProps = {
  teams: ITeams;
  college: string;
  revealTracker: IRevealTracker;
  setError: Dispatch<SetStateAction<string | null>>;
};

export default function Teams({
  teams,
  college,
  revealTracker,
  setError,
}: TeamsProps) {
  const [collegeTeam, setCollegeTeam] = useState<ITeam | null>(null);
  const [teamsInfo, setTeamsInfo] = useState<ITeam[]>([]);
  const [highlight, setHighlight] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const getTeamsInfo = async () => {
      try {
        const fetchTeams = teams.map(async ({ team }) => {
          const res = await fetch(`/dummyData/teams/${team}.json`);
          return await res.json();
        });

        const teamsResults = await Promise.all(fetchTeams);
        setTeamsInfo(teamsResults);

        if (college) {
          const res = await fetch(`/dummyData/teams/${college}.json`);
          const collegeInfo = await res.json();
          setCollegeTeam(collegeInfo);
        }
      } catch (err) {
        const errorCode =
          err instanceof Error && err.message.includes("404") ? "404" : "500";
        setError(err instanceof Error ? err.message : "unknown error");
        router.push(`/error/${errorCode}`);
      }
    };
    if (teams && teams.length) getTeamsInfo();
  }, [teams]);

  useEffect(() => {
    const trackerString = JSON.stringify(revealTracker);
    if (trackerString.length && trackerString.includes("true")) {
      setHighlight(true);
      setTimeout(() => {
        setHighlight(false);
      }, 3000);
    }
  }, [JSON.stringify(revealTracker)]);

  return (
    <Section highlight={highlight} highlightKey="teams-section">
      {collegeTeam && (
        <div className="flex items-center gap-2 md:gap-4">
          <HiddenInfo
            text="College"
            placeholder="XXXX - XXXX"
            reveal={true}
            width="md"
          />
          <TeamLogo
            src={collegeTeam.logo}
            alt="Draft Team Logo"
            reveal={revealTracker.college}
          />
        </div>
      )}
      {teamsInfo.length &&
        teams.map(({ start, end, team }, idx) => (
          <div
            className="flex items-center gap-2 md:gap-4"
            key={`teams-${idx}`}
          >
            <HiddenInfo
              text={`${start} - ${end}`}
              placeholder="XXXX - XXXX"
              reveal={revealTracker.teams[idx].years}
              width="md"
            />
            <TeamLogo
              src={getTeamLogo(team, teamsInfo)}
              alt="Draft Team Logo"
              reveal={revealTracker.teams[idx].logo}
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
